import { styled } from 'styled-components';
import Card from './Card';
import ColumnTitle from './ColumnTitle';

interface Props {
  onColumnTitleRename: () => void;
  onColumnRemove: () => void;
  column: Column;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onCardRegister: (updatedCard: Card) => void;
  onCardRemove: (cardId: number | undefined) => void;
  onCardAdd: (columnId: number) => void;
}

export default function Column({
  onColumnTitleRename,
  onColumnRemove,
  column,
  onMouseDown,
  onCardRegister,
  onCardRemove,
  onCardAdd,
}: Props) {
  const cardCount = column.cards.length;

  return (
    <StyledColumn>
      <ColumnTitle
        columnId={column.columnId}
        cardCount={cardCount}
        title={column.columnTitle}
        onColumnTitleRename={onColumnTitleRename}
        onColumnRemove={onColumnRemove}
        onCardAdd={onCardAdd}
      />
      {column.cards.map((card) => (
        <Card
          key={card.id}
          cardId={card.id}
          columnId={column.columnId}
          title={card.title}
          content={card.content}
          onMouseDown={onMouseDown}
          onCardRegister={onCardRegister}
          onCardRemove={onCardRemove}
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
