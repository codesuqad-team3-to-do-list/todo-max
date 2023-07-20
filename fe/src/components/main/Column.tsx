import { styled } from 'styled-components';
import Card from './Card';
import ColumnTitle from './ColumnTitle';
import { useState } from 'react';

interface Props {
  column: Column;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onRemoveCard: (cardId: number | undefined) => void;
  onAddCard: (addedCardInfo: Card, columnId: number) => void;
  onEditCard: (editedCardInfo: Card) => void;
}

export default function Column({
  column,
  onMouseDown,
  onRemoveCard,
  onAddCard,
  onEditCard,
}: Props) {
  const [mountAddCard, setMountAddCard] = useState(false);
  const cardCount = column.cards.length;

  const renderAddCard = () => setMountAddCard(true);
  const removeAddCard = () => setMountAddCard(false);

  return (
    <StyledColumn>
      <ColumnTitle
        cardCount={cardCount}
        title={column.columnTitle}
        renderAddCard={renderAddCard}
      />
      {mountAddCard && (
        <Card
          cardType="add"
          columnId={column.columnId}
          removeAddCard={removeAddCard}
          onAddCard={onAddCard}
        />
      )}
      {column.cards.map((card) => (
        <Card
          key={`${column.columnId}-${card.id}`}
          cardId={card.id}
          columnId={column.columnId}
          title={card.title}
          content={card.content}
          onMouseDown={onMouseDown}
          onRemoveCard={onRemoveCard}
          onEditCard={onEditCard}
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
