import { styled } from 'styled-components';
import Button from '../Button';
import Badge from '../Badge';
import ClosedIcon from '../ClosedIcon';
import PlusIcon from '../PlusIcon';

interface Props {
  cardCount: number;
  title: string;
  renderAddCard: () => void;
}

export default function ColumnTitle({
  cardCount,
  title,
  renderAddCard,
}: Props) {
  return (
    <StyledColumnTitle>
      <div className="text-area">
        <div className="column-title">{title}</div>
        <Badge count={cardCount} />
      </div>
      <div className="icon-area">
        <Button pattern="icon" iconHoverColor="blue" onClick={renderAddCard}>
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
