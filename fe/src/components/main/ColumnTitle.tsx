import { styled } from 'styled-components';
import Button from '../Button';
import Badge from '../Badge';
import ClosedIcon from '../ClosedIcon';
import PlusIcon from '../PlusIcon';

interface Props {
  columnId: number;
  cardCount: number;
  title: string;
  onColumnTitleRename: () => void;
  onColumnRemove: () => void;
  onCardAdd: (columnId: number) => void;
}

export default function ColumnTitle({
  columnId,
  cardCount,
  title,
  onCardAdd,
}: Props) {
  return (
    <StyledColumnTitle>
      <div className="text-area">
        <div className="column-title">{title}</div>
        <Badge count={cardCount} />
      </div>
      <div className="icon-area">
        <Button
          pattern="icon"
          iconHoverColor="blue"
          onClick={() => onCardAdd(columnId)}
        >
          <PlusIcon />
        </Button>
        <Button pattern="icon" iconHoverColor="red">
          <ClosedIcon />
        </Button>
      </div>
    </StyledColumnTitle>
  );
}

const StyledColumnTitle = styled.div`
  display: flex;
  padding: 0 16px;
  justify-content: space-between;
  align-items: center;

  .text-area {
    display: flex;
    gap: 8px;

    .column-title {
      font: ${(props) => props.theme.font.displayBold16};
      color: ${(props) => props.theme.colorSystem.textBold};
      display: flex;
      align-items: center;
    }
  }

  .icon-area {
    display: flex;
    gap: 8px;
  }
`;
