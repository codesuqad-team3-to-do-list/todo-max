import { styled } from 'styled-components';
import Card from './Card';
import ColumnTitle from './ColumnTitle';
import { useEffect, useRef, useState } from 'react';

interface Props {
  onColumnTitleRename: () => void;
  onColumnRemove: () => void;
  column: Column;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onRemoveCard: (cardId: number | undefined) => void;
  onAddCard: (addedCardInfo: Card, columnId: number) => void;
  onEditCard: (editedCardInfo: Card) => void;
  draggedCardId?: number;
  setCoordinate: React.Dispatch<React.SetStateAction<Coordinate>>;
}

export default function Column({
  onColumnTitleRename,
  onColumnRemove,
  column,
  onMouseDown,
  onRemoveCard,
  onAddCard,
  onEditCard,
  draggedCardId,
  setCoordinate,
}: Props) {
  const cardCount = column.cards.length;
  const columnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rect = columnRef.current?.getBoundingClientRect();
    if (rect) {
      setCoordinate((prevCoordinate) => {
        if (prevCoordinate?.columns) {
          return {
            ...prevCoordinate,
            columns: [
              ...prevCoordinate.columns,
              {
                id: column.columnId,
                min: rect.left,
                max: rect.right,
              },
            ],
          };
        } else {
          return {
            columns: [
              {
                id: column.columnId,
                min: rect.left,
                max: rect.right,
              },
            ],
          };
        }
      });
    }
  }, []);

  const renderAddCard = () => setMountAddCard(true);
  const removeAddCard = () => setMountAddCard(false);

  return (
    <StyledColumn ref={columnRef}>
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
          draggedCardId={draggedCardId}
          title={card.title}
          content={card.content}
          onMouseDown={onMouseDown}
          onRemoveCard={onRemoveCard}
          onEditCard={onEditCard}
          setCoordinate={setCoordinate}
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
