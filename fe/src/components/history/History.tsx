import { styled } from 'styled-components';
import HistoryList from './HistoryList';

interface Props {
  onClose?: () => void;
}

export default function History({}: Props) {
  return (
    <StyledHistory>
      <StyledHistoryTitleArea>
        <div className="title">사용자 활동 기록</div>
        <div className="button"></div>
      </StyledHistoryTitleArea>
      <HistoryList />
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
