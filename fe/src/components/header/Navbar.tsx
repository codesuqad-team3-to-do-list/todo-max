import { useState } from 'react';
import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button';
import HistoryIcon from '../HistoryIcon';
import History from '../history/History';
import { LocalStorageKey } from '../../types/constants';

interface Props {
  isLogin: boolean;
  setUserAccessToken: (accessToken: string) => void;
}

export default function Navbar({ isLogin, setUserAccessToken }: Props) {
  const [isOpenHistory, setIsOpenHistory] = useState(false);
  const navigate = useNavigate();

  const mountHistory = () => setIsOpenHistory(true);
  const unmountHistory = () => setIsOpenHistory(false);

  const onLogOut = () => {
    localStorage.removeItem(LocalStorageKey.AccessToken);
    localStorage.removeItem(LocalStorageKey.RefreshToken);
    setUserAccessToken('');
    navigate('/');
  };

  return (
    <StyledNavbar>
      <StyledButton>
        {isLogin ? (
          <button onClick={onLogOut}>로그아웃</button>
        ) : (
          // <Link to={'/'}>로그아웃</Link>
          <Link to={'/'}>로그인</Link>
        )}
      </StyledButton>
      <Button pattern="icon" iconHoverColor="blue" onClick={mountHistory}>
        <HistoryIcon />
      </Button>
      {isOpenHistory && <History unmountHistory={unmountHistory} />}
    </StyledNavbar>
  );
}

const StyledNavbar = styled.div`
  display: flex;
  gap: 24px;
  position: relative;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;

  a, button {
    font: ${(props) => props.theme.font.displayBold16};
    color: ${(props) => props.theme.colorSystem.textDefault};

    &:hover {
      color: ${(props) => props.theme.colorSystem.surfaceBrand};
    }
  }
`;
