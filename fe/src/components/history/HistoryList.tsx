import { styled } from 'styled-components';
import HistoryItem from './HistoryItem';

interface Props {
  histories: HistoryItem[];
  onEndReach: () => void;
}

export default function HistoryList({ histories, onEndReach }: Props) {
  function handleScroll(event: React.UIEvent<HTMLElement>) {
    const historyList = event.target;

    if (!(historyList instanceof HTMLElement)) {
      return;
    }

    const scrollHeight = historyList.scrollHeight;
    const scrollTop = historyList.scrollTop;
    const clientHeight = historyList.clientHeight;

    const isEndReached = Math.ceil(scrollTop) + clientHeight >= scrollHeight;

    if (isEndReached) {
      onEndReach();
    }
  }

  return (
    <StyledHistoryList onScroll={handleScroll}>
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
