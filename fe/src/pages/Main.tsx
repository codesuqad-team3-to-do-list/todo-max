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
  const url = import.meta.env.VITE_APP_BASE_URL;

  const onEditConfirm = (updatedCard: Update) => {
    fetch(`${url}/api/cards/${updatedCard.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCard),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        if (columns) {
          const newColumns = [...columns].map((column) => {
            column.cards.map((card) => {
              card.id === updatedCard.id ? updatedCard : card;
            });
          });

          setColumns(newColumns);
        }
      })
      .catch((error) => {
        console.error('Error updating card:', error);
      });
  };

  const onCardRemove = (cardId: number) => {};

  useEffect(() => {
    fetchColumns();
  }, []);

  const fetchColumns = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer ' +
          `eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MSwiZXhwIjoxNjg5Njc2ODgwfQ.mWX7bWPZ3Ezjr-t7J77_8UUQjKqm6WnyZWYTj0UM1EM`,
        'Content-Type': 'application/json',
      },
    };
    console.log(options);
    try {
      const response = await fetch(`${url}/api/columns`, options);
      if (!response.ok) {
        throw new Error('Failed to fetch columns');
      }
      const columns = await response.json();
      setColumns(columns.data);
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  };

  const onCardAdd = () => {};

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);

    const target = e.target;

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

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }

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
            onEditConfirm={onEditConfirm}
          />
        ))}

      {isDragging && dragData.current && (
        <Card
          cardId={dragData.current.id}
          title={dragData.current.title}
          content={dragData.current.content}
          drag={'true'}
          position={mousePosition}
          onEditConfirm={onEditConfirm}
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
