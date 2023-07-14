import { useState } from 'react';

interface Props {
  token: string | null;
}

export default function Main({}: Props) {
  const [columns, setColumns] = useState<Columns>();

  const onCardMove = () => {};
  const onColumnTitleRename = () => {};
  const onColumnRemove = () => {};
}
