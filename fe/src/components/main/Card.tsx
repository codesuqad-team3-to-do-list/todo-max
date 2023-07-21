import { styled } from 'styled-components';
import Button from '../Button';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import EditIcon from '../EditIcon';
import ClosedIcon from '../ClosedIcon';
import CardContent from './CardContent';
import { LocalStorageKey } from '../../types/constants';

type Props = {
  cardId?: number;
  cardType?: CardType;
  columnId?: number;
  title?: string;
  content?: string;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  drag?: 'true' | 'false';
  position?: Position;
  onRemoveCard?: (cardId: number) => void;
  removeAddCard?: () => void;
  onAddCard?: (addedCardInfo: Card, columnId: number) => void;
  onEditCard?: (editedCardInfo: Card) => void;
};

export default function Card({
  cardId,
  cardType = 'default',
  columnId,
  title,
  content,
  onMouseDown,
  drag,
  position,
  onRemoveCard,
  removeAddCard,
  onAddCard,
  onEditCard,
}: Props) {
  const [type, setType] = useState<CardType>(cardType);
  const [titleInput, setTitleInput] = useState('');
  const [bodyTextArea, setBodyTextArea] = useState('');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const isNotEdited = titleInput === title && bodyTextArea === content;
  const isEmpty = !titleInput || !bodyTextArea;
  const buttonInactive = isNotEdited || isEmpty;

  useEffect(() => {
    if (!textAreaRef.current) return;

    textAreaRef.current.style.height = '0px';

    const scrollHeight = textAreaRef.current.scrollHeight;
    const style = window.getComputedStyle(textAreaRef.current);
    const borderTop = parseInt(style.borderTop);
    const borderBottom = parseInt(style.borderBottom);

    textAreaRef.current.style.height = `${
      scrollHeight + borderTop + borderBottom
    }px`;
  }, [bodyTextArea]);

  const changeTitleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
  };

  const changeContentInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBodyTextArea(event.target.value);
  };

  const requestAddCard = async () => {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;
    const options = {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer ' + localStorage.getItem(LocalStorageKey.AccessToken),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: titleInput,
        content: bodyTextArea,
      }),
    };
    const url = new URL(`/api/columns/${columnId}/cards`, baseUrl);
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('추가 요청이 실패했습니다.');
    }

    const data = await response.json();

    return data;
  };

  const requestRemoveCard = async () => {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;
    const options = {
      method: 'DELETE',
      headers: {
        Authorization:
          'Bearer ' + localStorage.getItem(LocalStorageKey.AccessToken),
        'Content-Type': 'application/json',
      },
    };
    const url = new URL(`/api/columns/${columnId}/cards/${cardId}`, baseUrl);
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('삭제 요청이 실패했습니다.');
    }
  };

  const requestEditCard = async () => {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;
    const options = {
      method: 'PATCH',
      headers: {
        Authorization:
          'Bearer ' + localStorage.getItem(LocalStorageKey.AccessToken),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: cardId,
        title: titleInput,
        content: bodyTextArea,
      }),
    };
    const url = new URL(`/api/cards/${cardId}`, baseUrl);
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('수정 요청이 실패했습니다.');
    }

    const data = await response.json();

    return data;
  };

  const onCardEdit = () => {
    setType('edit');

    if (!title || !content) {
      return;
    }

    setTitleInput(title);
    setBodyTextArea(content);
  };

  const onCardRemoveClick = async () => {
    try {
      await requestRemoveCard();

      if (onRemoveCard && cardId) {
        onRemoveCard(cardId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onConfirmButtonClick = async () => {
    try {
      if (type === 'add' && removeAddCard && onAddCard) {
        const addedCardInfo = await requestAddCard();
        removeAddCard();
        onAddCard(addedCardInfo.data, columnId!);
        return;
      }

      if (type === 'edit' && onEditCard) {
        const { data } = await requestEditCard();
        onEditCard(data);
        setType('default');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onCancelButtonClick = () => {
    if (type === 'add' && removeAddCard) {
      removeAddCard();
      return;
    }

    if (type === 'edit') {
      setType('default');
    }
  };

  return (
    <StyledCard
      className="card"
      type={type}
      onMouseDown={onMouseDown}
      data-card-id={cardId}
      drag={drag}
      position={position}
    >
      <StyledCardContainer>
        <StyledTextArea>
          <CardContent
            {...{
              type,
              titleInput,
              changeTitleInput,
              bodyTextArea,
              changeContentInput,
              textAreaRef,
              title,
              content,
            }}
          />
          {(type === 'default' || type === 'drag' || type === 'place') && (
            <StyledCaption>author by web</StyledCaption>
          )}
          {(type === 'add' || type === 'edit') && (
            <StyledButtonContainer>
              <Button
                variant="gray"
                pattern="text"
                onClick={onCancelButtonClick}
              >
                <span>취소</span>
              </Button>
              <Button
                variant="blue"
                pattern="text"
                disabled={buttonInactive}
                onClick={onConfirmButtonClick}
              >
                <span>등록</span>
              </Button>
            </StyledButtonContainer>
          )}
        </StyledTextArea>
        {type !== 'add' && type !== 'edit' && (
          <StyledIconArea>
            <Button pattern="icon" iconHoverColor="blue" onClick={onCardEdit}>
              <EditIcon />
            </Button>
            <Button
              pattern="icon"
              iconHoverColor="red"
              onClick={onCardRemoveClick}
            >
              <ClosedIcon />
            </Button>
          </StyledIconArea>
        )}
      </StyledCardContainer>
    </StyledCard>
  );
}

interface CardProps {
  type: CardType;
  drag?: 'true' | 'false';
  position?: Position;
}

const StyledCard = styled.div<CardProps>`
  width: 300px;
  padding: 16px;
  border-radius: 8px;
  gap: 4px;
  user-select: none;
  background-color: ${(props) => props.theme.colorSystem.surfaceDefault};
  box-shadow: ${(props) =>
    props.type === 'drag'
      ? props.theme.objectStyles.dropShadow.floating
      : props.theme.objectStyles.dropShadow.normal};
  opacity: ${(props) =>
    props.type === 'place' ? props.theme.opacity.disabled : 1};
  position: ${(props) => props.drag === 'true' && 'fixed'};
  left: ${(props) => props.position && `${props.position.x}px`};
  top: ${(props) => props.position && `${props.position.y}px`};
`;

const StyledCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledTextArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledIconArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCaption = styled.div`
  font: ${(props) => props.theme.font.displayMD12};
  color: ${(props) => props.theme.colorSystem.textWeak};
`;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 8px;

  span {
    font: ${(props) => props.theme.font.displayBold14};
  }
`;
