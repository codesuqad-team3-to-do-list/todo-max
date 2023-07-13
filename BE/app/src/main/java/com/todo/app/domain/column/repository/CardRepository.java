package com.todo.app.domain.column.repository;

import com.todo.app.domain.column.domain.Card;
import com.todo.app.domain.column.domain.CardCreate;
import java.util.List;

public interface CardRepository {

    List<Card> findAllBy(Long memberId);

    Card save(CardCreate card);
}
