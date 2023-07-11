import styled from 'styled-components';
import { boxShadow } from '../styles/boxShadow';

export default function Card() {
  return (
    <CardContainer>
      <div>
        <div>title</div>
        <div>Body</div>
        <div>author by web</div>
      </div>
      <div>
        <div>X 버튼</div>
        <div>Edit 버튼</div>
      </div>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  ${boxShadow.floating}
`;
