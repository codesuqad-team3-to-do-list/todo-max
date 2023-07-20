package com.todo.app.domain.column.repository;

import com.todo.app.domain.column.domain.Card;
import java.util.List;
import java.util.Optional;

public interface CardRepository {

    List<Card> findAllBy(Long memberId);

    boolean existsCard(Long cardId);

    Card save(Card card);

    Card update(Card card);

    void delete(Long cardId);

    List<Long> findWeightsBy(Long prevId, Long nextId);

    Optional<String> findTitleBy(Long cardId);

    Optional<Long> findFirstCardWeightValue(Long columnId);

    List<Card> findCardsBy(Long columId);

    void updateWeightValueCards(List<Card> cards);

    void updateMove(Card card);
}
