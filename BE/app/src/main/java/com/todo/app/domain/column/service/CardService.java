package com.todo.app.domain.column.service;

import com.todo.app.domain.column.domain.Card;

public interface CardService {

    Card create(Card card);

    Card update(Card card);

    String delete(Long cardId);

    void move(Card card, Long previousCardId, Long nextCardId);
}
