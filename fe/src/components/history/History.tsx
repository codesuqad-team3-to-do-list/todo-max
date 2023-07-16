import { styled } from 'styled-components';
import HistoryList from './HistoryList';
import { useEffect, useState } from 'react';
import Button from '../Button';

interface Props {
  onClose?: () => void;
  onDeleteAll?: () => void;
}

export default function History({ onClose, onDeleteAll }: Props) {
  const [history, setHistory] = useState<History>();

  const fetchHistory = async () => {
    const historyId = 1;
    const count = 10;
    const response = await fetch(
      `api/histories?historyId=${historyId}&count=${count}`
    );
    const data = await response.json();

    setHistory(data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <StyledHistory>
      <StyledHistoryTitleArea>
        <div className="title">사용자 활동 기록</div>
        <Button
          type="ghost"
          elementPattern="iconText"
          role="close"
          text="닫기"
          onClick={onClose}
        />
      </StyledHistoryTitleArea>
      {history?.histories && <HistoryList histories={history?.histories} />}

      {history?.histories.length !== 0 && (
        <Button
          type="ghost"
          elementPattern="textOnly"
          role="delete"
          text="기록 전체 삭제"
          onClick={onDeleteAll}
        />
      )}
    </StyledHistory>
  );
}

const StyledHistory = styled.div`
  width: 366px;
  padding: 8px;
  border-radius: ${(props) => props.theme.objectStyles.radius.m};
  box-shadow: ${(props) => props.theme.objectStyles.dropShadow.floating};
`;

const StyledHistoryTitleArea = styled.div`
  display: flex;
  padding: 8px 8px 8px 16px;
  gap: 4px;

  .title {
    font: ${(props) => props.theme.font.displayBold16};
  }
`;
