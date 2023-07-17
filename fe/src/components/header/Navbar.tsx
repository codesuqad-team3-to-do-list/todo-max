import { useState } from 'react';
import historyIcon from '../../assets/history-icon.svg';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import History from '../history/History';

interface Props {
  isLogin: boolean;
}

export default function Navbar({ isLogin }: Props) {
  const [isOpenHistory, setIsOpenHistory] = useState(false);

  const onOpenHistory = () => setIsOpenHistory(true);
  const onCloseHistory = () => setIsOpenHistory(false);

  return (
    <StyledNavbar>
      {
        <StyledButton>
          {isLogin ? <a>로그아웃</a> : <Link to={'/'}>로그인</Link>}
        </StyledButton>
      }
      <StyledButton onClick={onOpenHistory}>
        <img src={historyIcon} />
      </StyledButton>
      {isOpenHistory && <History onClose={onCloseHistory} />}
    </StyledNavbar>
  );
}

const StyledNavbar = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;
