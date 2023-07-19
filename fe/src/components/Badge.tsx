import styled from 'styled-components';

interface Props {
  count: number;
}

export default function Badge({ count }: Props) {
  const maxCardsCount = 99;
  const cardsCount = count > maxCardsCount ? `${maxCardsCount}+` : count;

  return <StyledBadge>{cardsCount}</StyledBadge>;
}

const StyledBadge = styled.div`
  font: ${(props) => props.theme.font.displayMD12};
  color: ${(props) => props.theme.colorSystem.textWeak};
  border: 1px solid ${(props) => props.theme.colorSystem.borderDefault};
  border-radius: ${(props) => props.theme.objectStyles.radius.s};
  min-width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
