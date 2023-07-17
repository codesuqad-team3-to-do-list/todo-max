import { useState } from 'react';
import historyIcon from '../../assets/history-icon.svg';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {
  isLogin: boolean;
}

export default function Navbar({ isLogin }: Props) {
  const [isOpenHistory, setIsOpenHistory] = useState(false);

  const onToggleOpenHistory = () => setIsOpenHistory(!isOpenHistory);
  const onHistoryClose = () => {};

  return (
    <StyledNavbar>
      {
        <StyledButton>
          {isLogin ? <a>로그아웃</a> : <Link to={'/'}>로그인</Link>}
        </StyledButton>
      }
      <StyledButton onClick={onToggleOpenHistory}>
        <img src={historyIcon} />
      </StyledButton>
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
`;
