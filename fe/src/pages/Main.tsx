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
      const options = {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(
        import.meta.env.VITE_APP_BASE_URL + '/api/columns',
        options
      );

      if (!response.ok) {
        throw new Error('Failed to fetch columns');
      }

      const columns = await response.json();

      setColumns(columns.message);
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
            onColumnTitleRename={onColumnTitleRename}
            onColumnRemove={onColumnRemove}
            onMouseDown={onMouseDown}
            column={column}
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
