import { useState } from 'react';

interface Props {
  isLogin: boolean;
}

export default function Navbar({}: Props) {
  const [isOpenHistory, setIsOpenHistory] = useState(false);

  const onHistoryClose = () => {};

  return;
}
