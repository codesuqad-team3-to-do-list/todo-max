import HistoryItem from './HistoryItem';

interface Props {
  histories: HistoryItem[];
}

export default function HistoryList({ histories }: Props) {
  return (
    <>
      {histories.map((history) => (
        <HistoryItem key={history.id} {...history} />
      ))}
    </>
  );
}
