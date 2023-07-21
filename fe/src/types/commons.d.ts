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

type CardType = 'default' | 'add' | 'edit' | 'drag' | 'place';

interface Coordinate {
  columns?: {
    id: number;
    min: number;
    max: number;
    cards?: {
      id: number;
      min: number;
      max: number;
    }[];
  }[];
}
