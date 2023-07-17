import { styled } from 'styled-components';
import HistoryItem from './HistoryItem';

interface Props {
  histories: HistoryItem[];
}

export default function HistoryList({ histories }: Props) {
  return (
    <StyledHistoryList>
      {histories.map((history) => (
        <HistoryItem key={history.id} {...history} />
      ))}
    </StyledHistoryList>
  );
}

const StyledHistoryList = styled.ul`
  max-height: 570px;
  overflow: auto;

  li {
    border-bottom: 1px solid ${(props) => props.theme.colorSystem.borderDefault};
  }

  li:last-child {
    border-bottom: 0;
  }
`;
