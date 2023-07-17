import { styled } from 'styled-components';

export default function HistoryItem({
  action,
  cardTitle,
  previousColumnTitle,
  currentColumnTitle,
  actionDatetime,
}: HistoryItem) {
  const targetDateString = actionDatetime;
  const targetDate = new Date(targetDateString);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - targetDate.getTime();
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);

  let formattedTimeDifference;

  if (daysDifference > 0) {
    formattedTimeDifference = `${daysDifference}일 전`;
  } else if (hoursDifference > 0) {
    formattedTimeDifference = `${hoursDifference}시간 전`;
  } else if (minutesDifference > 0) {
    formattedTimeDifference = `${minutesDifference}분 전`;
  } else {
    formattedTimeDifference = '방금';
  }

  const content = (() => {
    switch (action) {
      case 'CREATE':
        return (
          <StyledContent>
            <StyledBold>{cardTitle}</StyledBold>을(를){' '}
            {/* <StyledBold>컬럼네임</StyledBold>에 등록하였습니다. */}
            등록하였습니다.
          </StyledContent>
        );

      case 'MODIFY':
        return (
          <StyledContent>
            <StyledBold>{cardTitle}</StyledBold>을(를) 변경하였습니다.
          </StyledContent>
        );

      case 'DELETE':
        return (
          <StyledContent>
            <StyledBold>{cardTitle}</StyledBold>을(를) 삭제하였습니다.
          </StyledContent>
        );

      case 'MOVE':
        return (
          <StyledContent>
            <StyledBold>{cardTitle}</StyledBold>을(를){' '}
            <StyledBold>{previousColumnTitle}</StyledBold>에서{' '}
            <StyledBold>{currentColumnTitle}</StyledBold>으로{' '}
            <StyledBold>이동</StyledBold>
            하였습니다.
          </StyledContent>
        );
    }
  })();

  return (
    <StyledHistory>
      <div>
        <StyledProfile src="https://avatars.githubusercontent.com/u/57666791?v=4" />
      </div>
      <StyledBody>
        <StyledUserName>@멋진쿤토</StyledUserName>
        {content}
        <StyledTimeStamp>{formattedTimeDifference}</StyledTimeStamp>
      </StyledBody>
    </StyledHistory>
  );
}

const StyledHistory = styled.li`
  display: flex;
  padding: 16px;
  gap: 16px;
`;

const StyledProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colorSystem.borderDefault};
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledUserName = styled.div`
  font: ${(props) => props.theme.font.displayMD14};
  color: ${(props) => props.theme.colorSystem.textBold};
`;

const StyledContent = styled.div`
  font: ${(props) => props.theme.font.displayMD14};
  color: ${(props) => props.theme.colorSystem.textDefault};
`;

const StyledBold = styled.span`
  font: ${(props) => props.theme.font.displayMD14};
  color: ${(props) => props.theme.colorSystem.textBold};
`;

const StyledTimeStamp = styled.div`
  font: ${(props) => props.theme.font.displayMD12};
  color: ${(props) => props.theme.colorSystem.textWeak};
`;
