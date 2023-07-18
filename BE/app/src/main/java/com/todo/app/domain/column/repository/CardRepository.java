package com.todo.app.domain.column.repository;

import com.todo.app.domain.column.domain.Card;
import com.todo.app.domain.column.domain.CardCreate;
import com.todo.app.domain.column.domain.CardUpdate;
import java.util.List;

public interface CardRepository {

    List<Card> findAllBy(Long memberId);

    boolean existsCard(Long cardId);

    Card save(CardCreate card);

    void update(CardUpdate card);

    void delete(Long cardId);

    List<Long> findWeightsBy(Long prevId, Long nextId);

    List<Card> findCardsBy(Long columId);

    void updateWeightValueCards(List<Card> cards);

    void updateMove(Card card);
}
