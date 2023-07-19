import { useEffect, useState, useRef } from 'react';
import Column from '../components/main/Column';
import { styled } from 'styled-components';
import Card from '../components/main/Card';

interface Props {
  token: string | null;
}

export default function Main({}: Props) {
  const [columns, setColumns] = useState<Column[]>();
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState<Position>();
  const dragData = useRef<Card>();
  const dragElement = useRef<Element>();
  const startPosition = useRef<Position>();
  const isMousePressed = useRef<boolean>(false);

  useEffect(() => {
    fetchColumns();
  }, []);

  const fetchColumns = async () => {
    try {
      const response = await fetch(`/api/columns`);
      if (!response.ok) {
        throw new Error('Failed to fetch columns');
      }
      const columns = await response.json();
      setColumns(columns.data);
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  };

  const onCardAdd = (columnId: number) => {
    if (!columns) {
      return;
    }

    setColumns((prevColumns) => {
      if (!prevColumns) {
        return;
      }

      const newCard = {
        id: Date.now(),
        title: '',
        content: '',
      };

      return prevColumns.map((column) => {
        if (column.columnId === columnId) {
          return {
            ...column,
            cards: [newCard, ...column.cards],
          };
        }

        return column;
      });
    });
  };

  const onCardRegister = (updatedCard: Card) => {
    if (!columns) {
      return;
    }

    setColumns((prevColumns) => {
      if (!prevColumns) {
        return;
      }

      return prevColumns.map((column) => {
        if (!updatedCard.id) {
          return {
            ...column,
            cards: [updatedCard, ...column.cards],
          };
        }

        return {
          ...column,
          cards: column.cards.map((card) =>
            card.id === updatedCard.id ? updatedCard : card
          ),
        };
      });
    });
  };

  const onCardRemove = (cardId: number | undefined) => {
    if (!columns) {
      return;
    }

    setColumns((prevColumns) => {
      if (!prevColumns) {
        return prevColumns;
      }

      return prevColumns.map((column) => ({
        ...column,
        cards: column.cards.filter((card) => card.id !== cardId),
      }));
    });
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isMousePressed.current = true;
    const target = e.currentTarget;

    if (target instanceof HTMLElement) {
      const targetElement = target.closest('.card');

      if (targetElement) {
        dragData.current = getDragElement({ targetElement, columns });
        dragElement.current = targetElement;
      }

      startPosition.current = {
        x: e.clientX,
        y: e.clientY,
      };
    }
  };

  const onMouseUp = () => {
    isMousePressed.current = false;
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMousePressed.current) {
      return;
    }

    setIsDragging(true);

    if (dragElement.current && startPosition.current) {
      const dragElem = dragElement.current.getBoundingClientRect();

      setMousePosition({
        x: e.clientX - startPosition.current.x + dragElem.x,
        y: e.clientY - startPosition.current.y + dragElem.y,
      });
    }
  };

  const onColumnTitleRename = () => {};
  const onColumnRemove = () => {};

  return (
    <StyledMain onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
      {columns &&
        columns.map((column) => (
          <Column
            key={column.columnId}
            onColumnTitleRename={onColumnTitleRename}
            onColumnRemove={onColumnRemove}
            onMouseDown={onMouseDown}
            column={column}
            onCardRegister={onCardRegister}
            onCardRemove={onCardRemove}
            onCardAdd={onCardAdd}
          />
        ))}

      {isDragging && dragData.current && (
        <Card
          cardId={dragData.current.id}
          title={dragData.current.title}
          content={dragData.current.content}
          drag={'true'}
          position={mousePosition}
          onCardRegister={onCardRegister}
          onCardRemove={onCardRemove}
        />
      )}
    </StyledMain>
  );
}

const getDragElement = ({
  targetElement,
  columns,
}: {
  targetElement: Element;
  columns: Column[] | undefined;
}) => {
  let element;

  columns?.some((column) => {
    element = column.cards.find(
      (card) => card.id === Number(targetElement?.getAttribute('data-card-id'))
    );

    return !!element;
  });

  return element;
};

const StyledMain = styled.main`
  display: flex;
  gap: 24px;
`;
