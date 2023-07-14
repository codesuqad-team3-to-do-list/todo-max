import { styled } from 'styled-components';
import Logo from './Logo';
import Navbar from './Navbar';

interface Props {
  isLogin: boolean;
}

export default function Header({ isLogin }: Props) {
  return (
    <StyledHeader>
      <Logo />
      <Navbar isLogin={isLogin} />
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
