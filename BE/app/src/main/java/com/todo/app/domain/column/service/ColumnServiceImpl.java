package com.todo.app.domain.column.service;

import com.todo.app.domain.column.domain.Card;
import com.todo.app.domain.column.domain.Column;
import com.todo.app.domain.column.repository.CardRepository;
import com.todo.app.domain.column.repository.ColumnRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ColumnServiceImpl implements ColumnService {

    private final ColumnRepository columnRepository;
    private final CardRepository cardRepository;

    public ColumnServiceImpl(ColumnRepository columnRepository, CardRepository cardRepository) {
        this.columnRepository = columnRepository;
        this.cardRepository = cardRepository;
    }

    @Override
    public List<Column> readAll(Long memberId) {
        List<Column> columns = columnRepository.findAllBy(memberId);
        List<Card> cards = cardRepository.findAllBy(memberId);

        for (Column column : columns) {
            column.matchCards(cards);
        }

        return columns;
    }
}
