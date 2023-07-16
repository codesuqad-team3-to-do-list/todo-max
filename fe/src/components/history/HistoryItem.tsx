import { styled } from 'styled-components';

export default function HistoryItem() {
  return (
    <StyledHistory>
      <div>
        <StyledProfile src="https://avatars.githubusercontent.com/u/57666791?v=4" />
      </div>
      <StyledBody>
        <StyledUserName>@멋진삼</StyledUserName>
        <StyledContent>
          블로그에 포스팅할 것을(를) 하고있는 일에서 해야할 일으로
          이동하였습니다.
        </StyledContent>
        <StyledTimeStamp>3분 전</StyledTimeStamp>
      </StyledBody>
    </StyledHistory>
  );
}

const StyledHistory = styled.div`
  display: flex;
  padding: 16px;
  gap: 16px;
`;

const StyledProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colors.grey200};
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledUserName = styled.div`
  font: ${(props) => props.theme.font.displayMD14};
  color: ${(props) => props.theme.colors.grey700};
`;

const StyledContent = styled.div`
  font: ${(props) => props.theme.font.displayMD14};
  color: ${(props) => props.theme.colors.grey600};
`;

const StyledTimeStamp = styled.div`
  font: ${(props) => props.theme.font.displayMD12};
  color: ${(props) => props.theme.colors.grey500};
`;
