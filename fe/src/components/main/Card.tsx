import { styled } from 'styled-components';
import Button from '../Button';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import EditIcon from '../EditIcon';
import ClosedIcon from '../ClosedIcon';

type Type = 'default' | 'add' | 'edit' | 'drag' | 'place';

type Props = {
  id: number;
  title: string;
  content: string;
  type?: Type;
};

export default function Card({ id, title, content }: Props) {
  const [type, setType] = useState<Type>('default');
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

  return (
    <StyledCard type={type}>
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
              <Button text="취소" role="cancel" width="100%" />
              <Button text="등록" width="100%" />
            </StyledButtonContainer>
          )}
        </StyledTextArea>
        {type !== 'add' && type !== 'edit' && (
          <StyledIconArea>
            <ClosedIcon />
            <EditIcon />
          </StyledIconArea>
        )}
      </StyledCardContainer>
    </StyledCard>
  );
}

interface CardProps {
  type: Type;
}

const StyledCard = styled.div<CardProps>`
  width: 300px;
  padding: 16px;
  border-radius: 8px;
  gap: 4px;
  user-select: none;
  box-shadow: ${(props) =>
    props.type === 'drag'
      ? props.theme.objectStyles.dropShadow.floating
      : props.theme.objectStyles.dropShadow.normal};
  opacity: ${(props) =>
    props.type === 'place' ? props.theme.opacity.disabled : 1};
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
`;

const StyledCaption = styled.div`
  font: ${(props) => props.theme.font.displayMD12};
  color: ${(props) => props.theme.colorSystem.textWeak};
`;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;
