import { styled } from 'styled-components';
import Logo from './Logo';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

interface Props {
  isLogin: boolean;
}

export default function Header({ isLogin }: Props) {
  return (
    <StyledHeader>
      <Link to={'/'}>
        <Logo />
      </Link>
      <Navbar isLogin={isLogin} />
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px 0;
  margin-bottom: 32px;
`;
