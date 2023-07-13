package com.todo.app.domain.column.service;

import com.todo.app.domain.column.domain.Card;
import com.todo.app.domain.column.domain.CardCreate;
import com.todo.app.domain.column.domain.CardUpdate;

public interface CardService {

    Card create(CardCreate card);

    Card update(CardUpdate card, Long columnId);
}
