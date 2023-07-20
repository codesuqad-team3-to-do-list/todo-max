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
          <Button variant="gray" pattern="text" onClick={closeModal}>
            <span className="cancel">취소</span>
          </Button>
          <Button variant="red" pattern="text" onClick={onConfirmClick}>
            <span className="confirm">삭제</span>
          </Button>
        </StyledButtonContainer>
      </StyledModal>
    </StyledModalContainer>
  );
}

const StyledModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.grey900};
  opacity: 0.3;
`;

const StyledModal = styled.div`
  position: relative;
  z-index: 1;
  min-width: 320px;
  padding: 24px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: ${(props) => props.theme.colorSystem.surfaceDefault};
  box-shadow: ${(props) => props.theme.objectStyles.dropShadow.up};
`;

const StyledModalBody = styled.div`
  font: ${(props) => props.theme.font.displayMD16};
`;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 8px;

  .confirm,
  .cancel {
    font: ${(props) => props.theme.font.displayBold14};
  }

  .confirm {
    color: ${(props) => props.theme.colorSystem.textWhiteDefault};
  }

  .cancel {
    color: ${(props) => props.theme.colorSystem.textDefault};
  }
`;
