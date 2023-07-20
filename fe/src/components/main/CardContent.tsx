import { ChangeEvent } from 'react';
import { styled } from 'styled-components';

interface Props {
  type: CardType;
  titleInput: string;
  changeTitleInput: (event: ChangeEvent<HTMLInputElement>) => void;
  bodyTextArea: string;
  changeContentInput: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  title?: string;
  content?: string;
}

export default function CardContent({
  type,
  titleInput,
  changeTitleInput,
  bodyTextArea,
  changeContentInput,
  textAreaRef,
  title,
  content,
}: Props) {
  return (
    <StyledContent>
      {type === 'add' || type === 'edit' ? (
        <>
          <StyledTitleInput
            value={titleInput}
            onChange={changeTitleInput}
            placeholder="제목을 입력하세요"
          />
          <StyledBodyTextarea
            value={bodyTextArea}
            onChange={changeContentInput}
            placeholder="내용을 입력하세요"
            ref={textAreaRef}
          />
        </>
      ) : (
        <>
          <StyledTitle>{title}</StyledTitle>
          <StyledBody>{content}</StyledBody>
        </>
      )}
    </StyledContent>
  );
}

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
