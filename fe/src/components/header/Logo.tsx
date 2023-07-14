import { styled } from 'styled-components';

export default function Logo() {
  return <StyledLogo>TODO LIST</StyledLogo>;
}

const StyledLogo = styled.div`
  font: ${(props) => props.theme.font.displayBold24};
  cursor: pointer;
`;
