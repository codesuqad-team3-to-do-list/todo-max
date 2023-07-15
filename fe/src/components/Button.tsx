import styled from 'styled-components';
import ClosedIcon from './ClosedIcon';
import EditIcon from './EditIcon';

type Type = 'contained' | 'ghost';
type Role = 'confirm' | 'edit' | 'delete' | 'close' | 'cancel';
type States = 'enabled' | 'disabled' | 'hover';

interface Props {
  type?: Type;
  elementPattern?: 'iconOnly' | 'textOnly' | 'iconText';
  states?: States;
  role?: Role;
  text?: string;
  onClick?: () => void;
  width?: string;
  height?: string;
}

export default function Button({
  elementPattern = 'textOnly',
  states = 'enabled',
  type = 'contained',
  role = 'confirm',
  text,
  onClick,
  width,
  height,
}: Props) {
  return (
    <StyledButton
      states={states}
      type={type}
      role={role}
      onClick={onClick}
      width={width}
      height={height}
    >
      {(elementPattern === 'iconOnly' || elementPattern === 'iconText') &&
        (role === 'close' ? (
          <ClosedIcon width={'16px'} />
        ) : role === 'edit' ? (
          <EditIcon />
        ) : null)}
      {(elementPattern === 'textOnly' || elementPattern === 'iconText') && (
        <StyledText>{text}</StyledText>
      )}
    </StyledButton>
  );
}

interface ButtonProps {
  states: States;
  type: Type;
  role?: Role;
  width?: string;
  height?: string;
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
    props.role === 'confirm' || props.role === 'delete'
      ? props.theme.colorSystem.textWhiteDefault
      : props.theme.colorSystem.textDefault};
  opacity: ${(props) =>
    props.states === 'hover'
      ? props.theme.opacity.hover
      : props.states === 'disabled'
      ? props.theme.opacity.disabled
      : 1};
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: ${(props) => props.theme.opacity.hover};
  }
`;

const StyledText = styled.div`
  font: ${(props) => props.theme.font.displayBold14};
  color: ${(props) => props.theme.colors.textWhiteDefault}
  padding: 0px 4px;
`;
