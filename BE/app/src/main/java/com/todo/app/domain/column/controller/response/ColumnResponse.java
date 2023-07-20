package com.todo.app.domain.column.controller.response;

import com.todo.app.domain.column.domain.Card;
import com.todo.app.domain.column.domain.Column;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class ColumnResponse {

    private Long columnId;
    private String columnTitle;
    private List<CardResponse> cards;

    public ColumnResponse(Long columnId, String columnTitle, List<CardResponse> cards) {
        this.columnId = columnId;
        this.columnTitle = columnTitle;
        this.cards = cards;
    }

    public static ColumnResponse from(Column column) {
        List<CardResponse> cardResponses = column.getCards().stream()
                .sorted(Comparator.comparing(Card::getWeightValue))
                .map(CardResponse::from)
                .collect(Collectors.toList());
        return new ColumnResponse(column.getId(), column.getTitle(), cardResponses);
    }

    public Long getColumnId() {
        return columnId;
    }

    public String getColumnTitle() {
        return columnTitle;
    }

    public List<CardResponse> getCards() {
        return cards;
    }
}
