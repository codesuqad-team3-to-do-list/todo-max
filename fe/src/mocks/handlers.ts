import { rest } from 'msw';

export const handlers = [
  // Column 목록 불러오기
  rest.get('/api/columns', (request, response, context) => {
    return response(context.status(200), context.json(successGetColumns));
  }),

  // 신규 Card 등록
  rest.post('/api/columns/:columnId/cards', (request, response, context) => {
    return response(context.status(201), context.json(successAddCard));
  }),

  // Card 제목/내용 수정하기
  rest.patch(
    '/api/columns/:columnId/cards/:cardId?action=update',
    (request, response, context) => {
      return response(context.status(200), context.json(successUpdateCard));
    }
  ),

  // Card 위치 변경하기
  rest.patch(
    '/api/columns/:columnId/cards/:cardId?action=move',
    (request, response, context) => {
      return response(context.status(200), context.json({}));
    }
  ),

  // Card 삭제하기
  rest.delete(
    '/api/columns/:columnId/cards/:cardId',
    (request, response, context) => {
      return response(context.status(200), context.json({}));
    }
  ),

  // History 목록 불러오기
  rest.get(
    '/api/histories?historyId=:historyId&count=:count',
    (request, response, context) => {
      return response(context.status(200), context.json(successGetHistory));
    }
  ),
];

const successGetColumns = {
  statusCode: '200',
  data: [
    {
      columnId: 1,
      columnTitle: '해야할 일',
      cards: [
        {
          id: 1,
          title: 'GitHub 공부하기',
          content: 'stash 개념 학습하기',
          weightValue: 1000,
        },
        {
          id: 2,
          title: '스터디 발표 준비',
          content: '데이터베이스 파티셔닝 자료 조사',
          weightValue: 2000,
        },
      ],
    },
    {
      columnId: 2,
      columnTitle: '하고 있는 일',
      cards: [
        {
          id: 3,
          title: '알고리즘 문제 풀기',
          content: '백준 14712, 15662번 풀기',
          weightValue: 1000,
        },
        {
          id: 5,
          title: 'AWS 공부하기',
          content: 'EC2, RDS 개념 학습',
          weightValue: 2000,
        },
        {
          id: 7,
          title: 'WAS 미션 2단계 수행',
          content: '세션 구현하기',
          weightValue: 3000,
        },
        {
          id: 8,
          title: 'JWT 공부하기',
          content: 'JWT 개념 및 장단점 학습하기',
          weightValue: 4000,
        },
      ],
    },
    {
      columnId: 3,
      columnTitle: '완료한 일',
      cards: [
        {
          id: 6,
          title: 'React 공부하기',
          content: '상태 관리 학습하기',
          weightValue: 1000,
        },
        {
          id: 9,
          title: 'WAS 미션 1단계 수행',
          content: 'POST로 회원가입 구현하기',
          weightValue: 2000,
        },
        {
          id: 10,
          title: 'Redis 공부하기',
          content: 'Redis 개념 및 설정 방법 학습하기',
          weightValue: 3000,
        },
        {
          id: 11,
          title: 'Kafka 공부하기',
          content: 'Kafka 메시지 개념 학습하기',
          weightValue: 4000,
        },
        {
          id: 12,
          title: 'DDD 공부하기',
          content: 'DDD 어그리거트에 대해 학습하기',
          weightValue: 5000,
        },
      ],
    },
  ],
};

const successAddCard = {
  statusCode: 201,
  data: {
    id: 14,
    title: '팀 프로젝트 API 명세 작성 4',
    content: '프론트쪽에 알려줄 API 명세서 작성하기 4',
  },
};

const successUpdateCard = {
  id: 1,
  title: '카드 제목',
  content: '카드 내용',
};

const successGetHistory = {
  statusCode: 200,
  data: {
    histories: [
      {
        id: 48,
        action: 'MOVE',
        cardTitle: '카드',
        previousColumnTitle: '제목2',
        currentColumnTitle: '제목1',
        actionDatetime: '2023-07-13T17:29:55',
      },
      {
        id: 47,
        action: 'MOVE',
        cardTitle: '카드',
        previousColumnTitle: '제목2',
        currentColumnTitle: '제목1',
        actionDatetime: '2023-07-13T16:37:27',
      },
      {
        id: 46,
        action: 'MOVE',
        cardTitle: '카드',
        previousColumnTitle: '제목2',
        currentColumnTitle: '제목1',
        actionDatetime: '2023-07-13T16:37:26',
      },
      {
        id: 45,
        action: 'MOVE',
        cardTitle: '카드',
        previousColumnTitle: '제목2',
        currentColumnTitle: '제목1',
        actionDatetime: '2023-07-13T16:26:44',
      },
      {
        id: 44,
        action: 'MOVE',
        cardTitle: '카드',
        previousColumnTitle: '제목2',
        currentColumnTitle: '제목1',
        actionDatetime: '2023-07-13T16:26:43',
      },
      {
        id: 43,
        action: 'MOVE',
        cardTitle: '카드',
        previousColumnTitle: '제목2',
        currentColumnTitle: '제목1',
        actionDatetime: '2023-07-13T16:21:42',
      },
      {
        id: 42,
        action: 'MOVE',
        cardTitle: '카드',
        previousColumnTitle: '제목2',
        currentColumnTitle: '제목1',
        actionDatetime: '2023-07-13T16:21:41',
      },
      {
        id: 41,
        action: 'MODIFY',
        cardTitle: '카드',
        actionDatetime: '2023-07-13T16:21:39',
      },
      {
        id: 40,
        action: 'DELETE',
        cardTitle: '카드',
        actionDatetime: '2023-07-13T16:06:33',
      },
      {
        id: 39,
        action: 'CREATE',
        cardTitle: '카드',
        actionDatetime: '2023-07-13T16:06:32',
      },
    ],
    hasNext: true,
  },
};
