import { styled } from 'styled-components';
import Card from './Card';
import ColumnTitle from './ColumnTitle';

interface Props {
  onCardMove: (event: MouseEvent) => void;
  onColumnTitleRename: () => void;
  onColumnRemove: () => void;
  column: Column;
}

export default function Column({
  column,
  onColumnTitleRename,
  onColumnRemove,
}: Props) {
  const cardCount = column.cards.length;

  return (
    <StyledColumn>
      <ColumnTitle
        cardCount={cardCount}
        title={column.columnTitle}
        onColumnTitleRename={onColumnTitleRename}
        onColumnRemove={onColumnRemove}
      />
      {column.cards.map((card) => (
        <Card
          cardId={card.id}
          columnId={column.columnId}
          title={card.title}
          content={card.content}
        />
      ))}
    </StyledColumn>
  );
}

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
