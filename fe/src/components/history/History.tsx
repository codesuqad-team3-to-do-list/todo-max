import { styled } from 'styled-components';
import HistoryList from './HistoryList';
import { useEffect, useState } from 'react';
import Button from '../Button';
import ConfirmModal from '../ConfirmModal';
import ClosedIcon from '../ClosedIcon';
import { LocalStorageKey } from '../../types/constants';

interface Props {
  unmountHistory: () => void;
}

type Toggle = 'close' | 'open';

export default function History({ unmountHistory }: Props) {
  const [histories, setHistories] = useState<History>();
  const [toggleAnimation, setToggleAnimation] = useState<Toggle>('close');
  const [isOpenDeleteAllModal, setIsOpenDeleteAllModal] = useState(false);
  const accessToken = localStorage.getItem(LocalStorageKey.AccessToken);

  const fetchHistory = async () => {
    const historyId = histories?.histories[histories.histories.length - 1]?.id;
    const count = 5;
    const path = historyId
      ? `api/histories?historyId=${historyId}&count=${count}`
      : `api/histories`;
    const url = new URL(path, import.meta.env.VITE_APP_BASE_URL);
    const options = {
      headers: {
        authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }

    const data = await response.json();

    return data;
  };

  const fetchAndSetHistories = async () => {
    try {
      const history = await fetchHistory();

      if (histories) {
        const newHistories = {
          histories: [...histories.histories, ...history.data.histories],
          hasNext: history.data.hasNext,
        } as History;
        setHistories(newHistories);

        return;
      }

      setHistories(history.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAndSetHistories();
    setToggleAnimation('open');
  }, []);

  const onTransitionEnd = () => {
    if (toggleAnimation === 'close') {
      unmountHistory();
    }
  };

  const onCloseButtonClick = () => {
    setToggleAnimation('close');
  };

  const fetchMoreHistories = () => {
    if (!histories?.hasNext) {
      return;
    }

    fetchAndSetHistories();
  };

  const onDeleteAll = () => {
    setHistories(undefined);
    setIsOpenDeleteAllModal(false);
  };

  return (
    <StyledHistory
      className="history"
      openanimation={toggleAnimation}
      onTransitionEnd={onTransitionEnd}
    >
      <StyledHistoryTitleArea>
        <div className="title">사용자 활동 기록</div>
        <Button pattern="icon" onClick={onCloseButtonClick}>
          <ClosedIcon width="16px" />
          <StyledButtonText>닫기</StyledButtonText>
        </Button>
      </StyledHistoryTitleArea>
      {histories && histories.histories.length > 0 ? (
        <HistoryList
          histories={histories.histories}
          onEndReach={fetchMoreHistories}
        />
      ) : (
        <StyledNoHistory>사용자 활동 기록이 없습니다.</StyledNoHistory>
      )}
      {histories?.histories && (
        <StyledButtonContainer>
          <Button pattern="text" onClick={() => setIsOpenDeleteAllModal(true)}>
            <span>기록 전체 삭제</span>
          </Button>
        </StyledButtonContainer>
      )}
      {isOpenDeleteAllModal && (
        <ConfirmModal
          closeModal={() => setIsOpenDeleteAllModal(false)}
          onConfirmClick={onDeleteAll}
        >
          모든 사용자 활동 기록을 삭제할까요?
        </ConfirmModal>
      )}
    </StyledHistory>
  );
}

interface HistoryProps {
  openanimation: Toggle;
}

const StyledHistory = styled.div<HistoryProps>`
  width: 366px;
  padding: 8px;
  border-radius: ${(props) => props.theme.objectStyles.radius.m};
  box-shadow: ${(props) => props.theme.objectStyles.dropShadow.floating};
  position: absolute;
  top: 40px;
  right: ${(props) => (props.openanimation === 'open' ? '-20px' : '-450px')};
  transition: right 1s;
  background-color: ${(props) => props.theme.colorSystem.surfaceDefault};
`;

const StyledHistoryTitleArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px 8px 16px;
  gap: 4px;

  .title {
    font: ${(props) => props.theme.font.displayBold16};
  }
`;

const StyledNoHistory = styled.div`
  width: 350px;
  padding: 16px;
  gap: 4px;
  color: ${(props) => props.theme.colorSystem.textWeak};
  text-align: center;
  font: ${(props) => props.theme.font.displayMD16};
`;

const StyledButtonContainer = styled.div`
  display: flex;
  padding: 4px 8px;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;

  span {
    font: ${(props) => props.theme.font.displayBold14};
    color: ${(props) => props.theme.colorSystem.surfaceDanger};
  }
`;

const StyledButtonText = styled.div`
  font: ${(props) => props.theme.font.displayBold14};
`;
