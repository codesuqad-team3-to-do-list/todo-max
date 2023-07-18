import { styled } from 'styled-components';
import Button from './Button';

interface Props {
  closeModal?: () => void;
  onConfirmClick?: () => void;
  children?: string;
}

export default function ConfirmModal({
  closeModal,
  onConfirmClick,
  children,
}: Props) {
  return (
    <StyledModalContainer>
      <StyledBackdrop onClick={closeModal} />
      <StyledModal>
        <StyledModalBody>{children}</StyledModalBody>
        <StyledButtonContainer>
          {/* <Button variant="red" pattern="text" onClick={closeModal}>
            취소
          </Button> */}
          {/* <Button role="cancel" text="취소" onClick={closeModal} />
          <Button role="delete" text="삭제" onClick={onConfirmClick} /> */}
        </StyledButtonContainer>
      </StyledModal>
    </StyledModalContainer>
  );
}

const StyledModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const StyledBackdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const StyledModal = styled.div`
  z-index: 1;
  min-width: 320px;
  padding: 24px;
  border-radius: 8px;
  gap: 24px;
  background-color: ${(props) => props.theme.colorSystem.surfaceDefault};
  box-shadow: ${(props) => props.theme.objectStyles.dropShadow.up};
`;

const StyledModalBody = styled.div`
  font: ${(props) => props.theme.font.displayMD16};
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
