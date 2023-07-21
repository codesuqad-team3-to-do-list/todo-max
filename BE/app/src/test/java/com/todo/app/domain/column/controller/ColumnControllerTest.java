package com.todo.app.domain.column.controller;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.todo.app.domain.column.controller.response.CardResponse;
import com.todo.app.domain.column.controller.response.ColumnResponse;
import com.todo.app.domain.column.domain.Card;
import com.todo.app.domain.column.domain.Column;
import com.todo.app.domain.column.service.ColumnService;
import com.todo.app.domain.column.service.ColumnServiceImpl;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest(controllers = ColumnController.class)
class ColumnControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    ColumnServiceImpl columnService;

    @DisplayName("사용자는 컬럼 목록과 컬럼에 해당하는 카드 목록을 볼 수 있다.")
    @Test
    void testReadColumns() throws Exception {
/*        CardResponse card1 = new CardResponse(1L,  "GitHub 공부하기", "stash 개념 학습하기");
        CardResponse card2 = new CardResponse(2L,  "스터디 발표 준비", "데이터베이스 파티셔닝 자료 조사");

        CardResponse card3 = new CardResponse(3L,  "알고리즘 문제 풀기", "백준 14712, 15662번 풀기");
        CardResponse card4 = new CardResponse(4L,  "AWS 공부하기", "EC2, RDS 개념 학습");

        CardResponse card5 = new CardResponse(5L,  "React 공부하기", "상태 관리 학습하기");
        CardResponse card6 = new CardResponse(6L,  "WAS 미션 1단계 수행", "POST로 회원가입 구현하기");

        ColumnResponse column1 = new ColumnResponse(1L, "해야 할 일", Arrays.asList(card1, card2));
        ColumnResponse column2 = new ColumnResponse(2L, "하고 있는 일", Arrays.asList(card3, card4));
        ColumnResponse column3 = new ColumnResponse(3L, "완료한 일", Arrays.asList(card5, card6));

        List<ColumnResponse> columns = Arrays.asList(column1, column2, column3);
*/
        //given(columnService.readAll(anyLong())).willAnswer((Answer<?>) columns);

        Card card1 = new Card(1L,  1L, "GitHub 공부하기", "stash 개념 학습하기", "web");
        Card card2 = new Card(2L,  1L, "스터디 발표 준비", "데이터베이스 파티셔닝 자료 조사", "web");
        Card card3 = new Card(3L, 2L, "알고리즘 문제 풀기", "백준 14712, 15662번 풀기", "web");
        Card card4 = new Card(4L, 2L,  "AWS 공부하기", "EC2, RDS 개념 학습", "web");
        Card card5 = new Card(5L,  3L, "React 공부하기", "상태 관리 학습하기", "web");
        Card card6 = new Card(6L,  3L, "WAS 미션 1단계 수행", "POST로 회원가입 구현하기", "web");
        List<Card> cards = Arrays.asList(card1, card2, card3, card4, card5, card6);

        Column column1 = new Column(1L, 1L, "해야 할 일");
        Column column2 = new Column(2L, 1L, "하고 있는 일");
        Column column3 = new Column(3L, 1L, "완료한 일");

        column1.matchCards(cards);
        column2.matchCards(cards);
        column3.matchCards(cards);

        List<Column> columns = Arrays.asList(column1, column2, column3);

        when(columnService.readAll(anyLong())).thenReturn(columns);

        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/columns"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$.statusCode").value(200));

    }


}