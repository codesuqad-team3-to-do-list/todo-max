import { styled } from 'styled-components';

interface UserInputProps {
  type: 'email' | 'password';
  placeholder: string;
  value: string;
  handleSetValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserInput({
  type,
  placeholder,
  value,
  handleSetValue,
}: UserInputProps) {
  return (
    <StyledUserInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        handleSetValue(event)
      }
      required
    />
  );
}

const StyledUserInput = styled.input`
  font: ${(props) => props.theme.font.displayMD14};
  background-color: ${(props) => props.theme.colorSystem.surfaceDefault};
  border: 2px solid ${(props) => props.theme.colorSystem.borderDefault};
  border-radius: ${(props) => props.theme.objectStyles.radius.s};
  box-shadow: ${(props) => props.theme.objectStyles.dropShadow.normal};
  width: 100%;
  height: 50px;
  margin-top: 10px;
  padding: 0 10px;
  box-sizing: border-box;

  &::placeholder {
    font: ${(props) => props.theme.font.displayMD12};
    color: ${(props) => props.theme.colorSystem.textWeak};
  }

  &:hover {
    border: 2px solid ${(props) => props.theme.colors.grey600};
  }
`;
