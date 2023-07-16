import { styled } from 'styled-components';
import HistoryList from './HistoryList';
import { useEffect, useState } from 'react';
import Button from '../Button';

interface Props {
  onClose?: () => void;
  onDeleteAll?: () => void;
}

export default function History({ onClose, onDeleteAll }: Props) {
  const [histories, setHistories] = useState<History>();

  const fetchHistory = async () => {
    const historyId = 1;
    const count = 10;
    const response = await fetch(
      `api/histories?historyId=${historyId}&count=${count}`
    );
    const data = await response.json();

    setHistories(data.message);
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
      {histories ? (
        <HistoryList histories={histories.histories} />
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

const StyledHistory = styled.div`
  width: 366px;
  padding: 8px;
  border-radius: ${(props) => props.theme.objectStyles.radius.m};
  box-shadow: ${(props) => props.theme.objectStyles.dropShadow.floating};
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
