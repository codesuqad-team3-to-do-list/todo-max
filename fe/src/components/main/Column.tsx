import { styled } from 'styled-components';
import Card from './Card';
import ColumnTitle from './ColumnTitle';

interface Props {
  onColumnTitleRename: () => void;
  onColumnRemove: () => void;
  column: Column;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onEditConfirm: (updatedCard: Update) => void;
}

export default function Column({
  onColumnTitleRename,
  onColumnRemove,
  column,
  onMouseDown,
  onEditConfirm,
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
          key={card.id}
          cardId={card.id}
          columnId={column.columnId}
          title={card.title}
          content={card.content}
          onMouseDown={onMouseDown}
          onEditConfirm={onEditConfirm}
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
