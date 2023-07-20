interface ImportMeta {
  env: ImportMetaEnv;
}

type Columns = Column[] | undefined;

interface Column {
  columnId: number;
  columnTitle: string;
  cards: Card[];
}

interface Card {
  id?: number;
  title: string;
  content: string;
}

interface History {
  histories: HistoryItem[];
  hasNext: true;
}

interface HistoryItem {
  id: number;
  action: 'CREATE' | 'MOVE' | 'MODIFY' | 'DELETE';
  cardTitle: string;
  previousColumnTitle?: string;
  currentColumnTitle?: string;
  actionDatetime: string;
}
type Position = { x: number; y: number };

type CardType = 'default' | 'add' | 'edit' | 'drag' | 'place';
