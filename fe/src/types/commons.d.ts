type Columns = Column[] | undefined;

interface Column {
  columnId: number;
  columnTitle: string;
  cards: Card[];
}

interface Card {
  id: number;
  title: string;
  content: string;
}

type Position = { x: number; y: number };
