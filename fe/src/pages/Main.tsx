import { useState } from 'react';
import History from '../components/history/History';

interface Props {
  token: string | null;
}

export default function Main({}: Props) {
  const [columns, setColumns] = useState<Columns>();

  const onCardMove = () => {};
  const onColumnTitleRename = () => {};
  const onColumnRemove = () => {};

  return <></>;
}
