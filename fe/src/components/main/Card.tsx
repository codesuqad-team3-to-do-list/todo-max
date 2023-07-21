import { createGlobalStyle, styled } from 'styled-components';
import Button from '../Button';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import EditIcon from '../EditIcon';
import ClosedIcon from '../ClosedIcon';

type Type = 'default' | 'add' | 'edit' | 'drag' | 'place';

type Props = {
  cardId: number;
  columnId?: number;
  title: string;
  content: string;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  drag?: 'true' | 'false';
  position?: Position;
  onRemoveCard?: (cardId: number) => void;
  removeAddCard?: () => void;
  onAddCard?: (addedCardInfo: Card, columnId: number) => void;
  onEditCard?: (editedCardInfo: Card) => void;
  draggedCardId?: number;
  setCoordinate?: React.Dispatch<React.SetStateAction<Coordinate>>;
};

export default function Card({
  cardId,
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
  draggedCardId,
  setCoordinate,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (cardId && rect && setCoordinate) {
      setCoordinate((prevCoordinate) => {
        return {
          ...prevCoordinate,
          columns: prevCoordinate?.columns?.map((column) => {
            if (column.id === columnId) {
              return {
                ...column,
                cards: [
                  ...(column.cards ?? []),
                  {
                    id: cardId,
                    min: rect.top,
                    max: rect.bottom,
                  },
                ],
              };
            }
            return column;
          }),
        };
      });
    }
  }, []);

  const [type, setType] = useState<CardType>(cardType);
  const [titleInput, setTitleInput] = useState('');
  const [bodyTextArea, setBodyTextArea] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = '0px';

    const scrollHeight = textareaRef.current.scrollHeight;
    const style = window.getComputedStyle(textareaRef.current);
    const borderTop = parseInt(style.borderTop);
    const borderBottom = parseInt(style.borderBottom);

    textareaRef.current.style.height = `${
      scrollHeight + borderTop + borderBottom
    }px`;
  }, [bodyTextArea]);

  const isNotEdit = !titleInput.length || !bodyTextArea.length;

  const onCardEdit = () => {
    setType('edit');
  };

  const onCardEditClose = () => {
    setType('default');
  };

  return (
    <StyledCard
      className="card"
      type={type}
      onMouseDown={onMouseDown}
      data-card-id={cardId}
      drag={drag}
      position={position}
      ref={cardRef}
    >
      <StyledCardContainer>
        <StyledTextArea>
          <StyledContent>
            {type === 'add' || type === 'edit' ? (
              <>
                <StyledTitleInput
                  value={titleInput}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setTitleInput(event.target.value)
                  }
                  placeholder="제목을 입력하세요"
                />
                <StyledBodyTextarea
                  value={bodyTextArea}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                    setBodyTextArea(event.target.value)
                  }
                  placeholder="내용을 입력하세요"
                  ref={textareaRef}
                />
              </>
            ) : (
              <>
                <StyledTitle>{title}</StyledTitle>
                <StyledBody>{content}</StyledBody>
              </>
            )}
          </StyledContent>
          {(type === 'default' || type === 'drag' || type === 'place') && (
            <StyledCaption>author by web</StyledCaption>
          )}
          {(type === 'add' || type === 'edit') && (
            <StyledButtonContainer>
              <Button variant="gray" pattern="text" onClick={onCardEditClose}>
                <span>취소</span>
              </Button>
              <Button variant="blue" pattern="text" disabled={isNotEdit}>
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
            <Button pattern="icon" iconHoverColor="red">
              <ClosedIcon />
            </Button>
          </StyledIconArea>
        )}
      </StyledCardContainer>
    </StyledCard>
  );
}

interface CardProps {
  type: Type;
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

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledTitle = styled.div`
  font: ${(props) => props.theme.font.displayBold14};
  color: ${(props) => props.theme.colorSystem.textStrong};
`;

const StyledBody = styled.div`
  font: ${(props) => props.theme.font.displayMD14};
  color: ${(props) => props.theme.colorSystem.textDefault};
`;

const StyledTitleInput = styled.input`
  font: ${(props) => props.theme.font.displayBold14};
  color: ${(props) => props.theme.colorSystem.textStrong};
`;

const StyledBodyTextarea = styled.textarea`
  font: ${(props) => props.theme.font.displayMD14};
  color: ${(props) => props.theme.colorSystem.textDefault};
  overflow: hidden;
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
