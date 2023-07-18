import { useEffect, useState } from 'react';
import Column from '../components/main/Column';
import { styled } from 'styled-components';

interface Props {
  token: string | null;
}

export default function Main({}: Props) {
  const [columns, setColumns] = useState<Column[]>();

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

  const onCardMove = () => {};
  const onColumnTitleRename = () => {};
  const onColumnRemove = () => {};

  return (
    <StyledMain>
      {columns?.map((column) => (
        <Column
          key={column.columnId}
          onCardMove={onCardMove}
          onColumnTitleRename={onColumnTitleRename}
          onColumnRemove={onColumnRemove}
          column={column}
        />
      ))}
    </StyledMain>
  );
}

const StyledMain = styled.main`
  display: flex;
  gap: 24px;
`;
