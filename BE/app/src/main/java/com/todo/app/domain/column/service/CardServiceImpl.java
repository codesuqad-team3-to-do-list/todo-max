package com.todo.app.domain.column.service;

import com.todo.app.domain.column.domain.Card;
import com.todo.app.domain.column.domain.CardCreate;
import com.todo.app.domain.column.domain.CardUpdate;
import com.todo.app.domain.column.repository.CardRepository;
import org.springframework.stereotype.Service;

@Service
public class CardServiceImpl implements CardService {

    private final CardRepository cardRepository;

    public CardServiceImpl(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    @Override
    public Card create(CardCreate card) {
        return cardRepository.save(card);
    }

    @Override
    public Card update(CardUpdate card, Long columnId) {
        return cardRepository.update(card, columnId);
    }
}
