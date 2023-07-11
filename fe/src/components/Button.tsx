import PlusIcon from '../assets/plus-icon.svg';
import styled from 'styled-components';

export default function Button() {
  return (
    <ButtonDiv>
      <img src={PlusIcon} />
      <span></span>
    </ButtonDiv>
  );
}

const ButtonDiv = styled.button`
  background-color: blue;
`;
