import { styled } from 'styled-components';
import Logo from './Logo';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

interface Props {
  isLogin: boolean;
  setUserAccessToken: (accessToken: string) => void;
}

export default function Header({ isLogin, setUserAccessToken }: Props) {
  return (
    <StyledHeader>
      <Link to={'/main'}>
        <Logo />
      </Link>
      <Navbar isLogin={isLogin} setUserAccessToken={setUserAccessToken} />
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
