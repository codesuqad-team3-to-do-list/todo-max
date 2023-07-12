package com.todo.app.domain.column.service;

import com.todo.app.domain.column.entity.Card;
import com.todo.app.domain.column.entity.Column;
import com.todo.app.domain.column.repository.CardRepository;
import com.todo.app.domain.column.repository.ColumnRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import org.springframework.stereotype.Service;

@Service
public class ColumnService {

    private final ColumnRepository columnRepository;
    private final CardRepository cardRepository;

    public ColumnService(ColumnRepository columnRepository, CardRepository cardRepository) {
        this.columnRepository = columnRepository;
        this.cardRepository = cardRepository;
    }

    // TODO: 로직 개선 필요...
    public List<Column> readAll(Long memberId) {
        List<Column> columns = columnRepository.findAllBy(memberId);
        List<Card> cards = cardRepository.findAllBy(memberId);

        for (Column column : columns) {
            List<Card> tmp = new ArrayList<>();

            for (Card card : cards) {
                if (Objects.equals(column.getId(), card.getColumnId())) {
                    tmp.add(card);
                }
            }
            column.setCards(tmp);
        }
        return columns;
    }

}
