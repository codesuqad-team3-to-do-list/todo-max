import styled from 'styled-components';
import ClosedIcon from './ClosedIcon';
import EditIcon from './EditIcon';
import PlusIcon from './PlusIcon';

type Type = 'contained' | 'ghost';
type Role = 'confirm' | 'add' | 'edit' | 'delete' | 'close' | 'cancel';

interface Props {
  type?: Type;
  elementPattern?: 'iconOnly' | 'textOnly' | 'iconText';
  role?: Role;
  text?: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  disabled?: boolean;
}

export default function Button({
  elementPattern = 'textOnly',
  type = 'contained',
  role = 'confirm',
  text,
  onClick,
  width,
  height,
  disabled,
}: Props) {
  return (
    <StyledButton
      type={type}
      role={role}
      onClick={onClick}
      width={width}
      height={height}
      disabled={disabled}
    >
      {(elementPattern === 'iconOnly' || elementPattern === 'iconText') &&
        (role === 'close' ? (
          <ClosedIcon width={'16px'} />
        ) : role === 'edit' ? (
          <EditIcon />
        ) : role === 'add' ? (
          <PlusIcon />
        ) : null)}
      {(elementPattern === 'textOnly' || elementPattern === 'iconText') && (
        <StyledText>{text}</StyledText>
      )}
    </StyledButton>
  );
}

interface ButtonProps {
  type: Type;
  role?: Role;
  width?: string;
  height?: string;
  disabled?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) =>
    props.type === 'ghost'
      ? 'rgba(0, 0, 0, 0)'
      : props.role === 'confirm'
      ? props.theme.colorSystem.surfaceBrand
      : props.role === 'delete'
      ? props.theme.colorSystem.surfaceDanger
      : props.theme.colorSystem.surfaceAlt};
  font: ${(props) => props.theme.font.displayBold14};
  color: ${(props) =>
    props.role === 'confirm'
      ? props.theme.colorSystem.textWhiteDefault
      : props.role === 'delete'
      ? props.theme.colorSystem.textDanger
      : props.theme.colorSystem.textDefault};
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: ${(props) => props.theme.opacity.hover};
  }

  &:disabled {
    opacity: ${(props) => props.theme.opacity.disabled};
  }
`;

const StyledText = styled.div`
  font: ${(props) => props.theme.font.displayBold14};
  color: ${(props) => props.theme.colors.textWhiteDefault}
  padding: 0px 4px;
`;
