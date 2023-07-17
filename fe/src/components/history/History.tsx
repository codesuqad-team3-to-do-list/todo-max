import { styled } from 'styled-components';
import HistoryList from './HistoryList';
import { useEffect, useState } from 'react';
import Button from '../Button';

interface Props {
  onClose: () => void;
  onDeleteAll?: () => void;
}

type Toggle = 'close' | 'open';

export default function History({ onClose, onDeleteAll }: Props) {
  const [histories, setHistories] = useState<History>();
  const [toggleAnimation, setToggleAnimation] = useState<Toggle>('close');

  const fetchHistory = async () => {
    const historyId = histories?.histories[histories.histories.length - 1]?.id;
    const count = 5;
    const url = historyId
      ? `api/histories?historyId=${historyId}&count=${count}`
      : 'api/histories';
    const response = await fetch(url);
    const data = await response.json();

    setHistories(data.message);
  };

  useEffect(() => {
    fetchHistory();
    setToggleAnimation('open');
  }, []);

  const onCloseHistory = () => {
    setToggleAnimation('close');
    document.addEventListener('transitionend', onClose, { once: true });
  };

  const fetchMoreHistories = () => {
    if (!histories?.hasNext) {
      return;
    }

    fetchHistory();
  };

  return (
    <StyledHistory openanimation={toggleAnimation}>
      <StyledHistoryTitleArea>
        <div className="title">사용자 활동 기록</div>
        <Button
          type="ghost"
          elementPattern="iconText"
          role="close"
          text="닫기"
          onClick={onCloseHistory}
        />
      </StyledHistoryTitleArea>
      {histories ? (
        <HistoryList
          histories={histories.histories}
          onEndReach={fetchMoreHistories}
        />
      ) : (
        <StyledNoHistory>사용자 활동 기록이 없습니다.</StyledNoHistory>
      )}
      {histories?.length !== 0 && (
        <StyledButtonContainer>
          <Button
            type="ghost"
            elementPattern="textOnly"
            role="delete"
            text="기록 전체 삭제"
            onClick={onDeleteAll}
          />
        </StyledButtonContainer>
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
  top: 20px;
  right: ${(props) => (props.openanimation === 'open' ? '0px' : '-370px')};
  transition: all 1s;
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
`;
