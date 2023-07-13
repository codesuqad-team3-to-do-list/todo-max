package com.todo.app.domain.column.service;

import com.todo.app.domain.column.domain.Card;
import com.todo.app.domain.column.domain.CardCreate;

public interface CardService {

    Card create(CardCreate card);
}
