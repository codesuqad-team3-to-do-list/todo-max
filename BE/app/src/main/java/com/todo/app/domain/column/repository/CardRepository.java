package com.todo.app.domain.column.repository;

import com.todo.app.domain.column.domain.Card;
import com.todo.app.domain.column.domain.CardCreate;
import com.todo.app.domain.column.domain.CardUpdate;
import java.util.List;

public interface CardRepository {

    List<Card> findAllBy(Long memberId);

    Card save(CardCreate card);

    Card update(CardUpdate card, Long columnId);

    void delete(Long cardId);
}
