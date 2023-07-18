import { ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';
import { designSystem } from '../styles/designSystem';

type ButtonVariant = 'blue' | 'red' | 'gray' | 'transparent';
type ButtonPattern = 'text' | 'icon';

type Variant = {
  color: string;
  background: string;
};

type Variants = {
  blue: Variant;
  red: Variant;
  gray: Variant;
  transparent: Variant;
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  pattern: ButtonPattern;
  iconHoverColor?: string;
}

export default function Button({
  variant = 'transparent',
  pattern,
  iconHoverColor,
  children,
  ...props
}: ButtonProps) {
  const VARIANTS: Variants = {
    blue: {
      color: designSystem.colorSystem.textWhiteDefault,
      background: designSystem.colorSystem.surfaceBrand,
    },
    red: {
      color: designSystem.colorSystem.textWhiteDefault,
      background: designSystem.colorSystem.surfaceDanger,
    },
    gray: {
      color: designSystem.colorSystem.textDefault,
      background: designSystem.colorSystem.surfaceAlt,
    },
    transparent: {
      color: designSystem.colorSystem.textDefault,
      background: 'none',
    },
  };

  return (
    <StyledButton
      {...{
        variants: VARIANTS,
        variant,
        pattern,
        iconhovercolor: iconHoverColor,
      }}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

interface StyledButtonProps {
  variants: Variants;
  variant: ButtonVariant;
  pattern: ButtonPattern;
  iconhovercolor?: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  width: ${(props) => (props.pattern === 'text' ? '132px' : 'auto')};
  height: ${(props) => (props.pattern === 'text' ? '32px' : 'auto')};
  padding: ${(props) => (props.pattern === 'text' ? '4px' : '0px')};
  color: ${(props) => props.variants[props.variant].color};
  background: ${(props) => props.variants[props.variant].background};
  border-radius: ${(props) => props.theme.objectStyles.radius.s};
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.8;

    & svg path {
      fill: ${(props) =>
        props.iconhovercolor === 'red'
          ? props.theme.colorSystem.surfaceDanger
          : props.iconhovercolor === 'blue'
          ? props.theme.colorSystem.surfaceBrand
          : null};
    }
  }

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }
`;
