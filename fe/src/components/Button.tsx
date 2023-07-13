import styled from 'styled-components';
import PlusIcon from './PlusIcon';
import { designSystem } from '../styles/designSystem';

type States = 'enabled' | 'disabled' | 'hover';
type Type = 'confirm' | 'delete' | 'cancel';

interface Props {
  elementPattern?: 'iconOnly' | 'textOnly' | 'iconText';
  states?: States;
  type?: Type;
  text?: string;
  onClick?: () => void;
  width?: string;
  height?: string;
}

export default function Button({
  elementPattern = 'textOnly',
  states = 'enabled',
  type = 'confirm',
  text,
  onClick,
  width,
  height,
}: Props) {
  return (
    <StyledButton
      states={states}
      type={type}
      onClick={onClick}
      width={width}
      height={height}
    >
      {(elementPattern === 'iconOnly' || elementPattern === 'iconText') && (
        <PlusIcon width={16} fill={designSystem.colorSystem.textWhiteDefault} />
      )}
      {(elementPattern === 'textOnly' || elementPattern === 'iconText') && (
        <StyledText>{text}</StyledText>
      )}
    </StyledButton>
  );
}

interface ButtonProps {
  states: States;
  type: Type;
  width?: string;
  height?: string;
}

const StyledButton = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) =>
    props.type === 'confirm'
      ? props.theme.colorSystem.surfaceBrand
      : props.type === 'delete'
      ? props.theme.colorSystem.surfaceDanger
      : props.theme.colorSystem.surfaceAlt};

  font: ${(props) => props.theme.font.displayBold14};
  color: ${(props) =>
    props.type === 'confirm' || props.type === 'delete'
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
