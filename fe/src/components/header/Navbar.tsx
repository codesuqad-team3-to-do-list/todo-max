import { useState } from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../Button';
import HistoryIcon from '../HistoryIcon';
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
          {isLogin ? (
            <Link to={'/login'}>로그아웃</Link>
          ) : (
            <Link to={'/login'}>로그인</Link>
          )}
        </StyledButton>
      }
      <Button pattern="icon" iconHoverColor="blue" onClick={onOpenHistory}>
        <HistoryIcon />
      </Button>
      {isOpenHistory && <History onClose={onCloseHistory} />}
    </StyledNavbar>
  );
}

const StyledNavbar = styled.div`
  display: flex;
  gap: 24px;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;

  a {
    font: ${(props) => props.theme.font.displayBold16};
    color: ${(props) => props.theme.colorSystem.textDefault};

    &:hover {
      color: ${(props) => props.theme.colorSystem.surfaceBrand};
    }
  }
`;
