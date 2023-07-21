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
  const [coordinate, setCoordinate] = useState<Coordinate>({});

  useEffect(() => {
    console.log(coordinate);
  }, [coordinate]);

  useEffect(() => {
    (async () => {
      const columns = await fetchColumns();
      setColumns(columns.data);
    })();
  }, []);

  const fetchColumns = async () => {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;
    const options = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    };
    const url = new URL(`/api/columns`, baseUrl);
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('Failed to fetch columns');
    }

    const data = await response.json();

    return data;
  };

  const onAddCard = (addedCardInfo: Card, columnId: number) => {
    if (!columns) {
      return;
    }

    const updatedColumns = columns.map((column) =>
      column.columnId === columnId
        ? { ...column, cards: [addedCardInfo, ...column.cards] }
        : { ...column }
    );

    setColumns(updatedColumns);
  };

  const onRemoveCard = (cardId: number | undefined) => {
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

  const onEditCard = (editedCardInfo: Card) => {
    if (!columns) {
      return;
    }

    const updatedColumns = columns.map((column) => ({
      ...column,
      cards: column.cards.map((card) =>
        card.id === editedCardInfo.id ? { ...card, ...editedCardInfo } : card
      ),
    }));

    setColumns(updatedColumns);
  };

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

  useEffect(() => {
    fetchColumns();
  }, []);

  const fetchColumns = async () => {
    try {
      const response = await fetch('/api/columns');
      if (!response.ok) {
        throw new Error('Failed to fetch columns');
      }
      const columns = await response.json();
      setColumns(columns.data);
    } catch (error) {
      console.error('Error fetching columns:', error);
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
            draggedCardId={dragData.current?.id}
            onMouseDown={onMouseDown}
            column={column}
            onRemoveCard={onRemoveCard}
            onAddCard={onAddCard}
            onEditCard={onEditCard}
            setCoordinate={setCoordinate}
          />
        ))}

      {isDragging && dragData.current && (
        <Card
          cardId={dragData.current.id}
          title={dragData.current.title}
          content={dragData.current.content}
          drag={'true'}
          position={mousePosition}
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
