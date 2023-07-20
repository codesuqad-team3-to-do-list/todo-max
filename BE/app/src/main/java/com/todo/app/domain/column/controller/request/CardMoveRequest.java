package com.todo.app.domain.column.controller.request;

import com.todo.app.domain.column.domain.Card;
import com.todo.app.domain.history.entity.Action;
import com.todo.app.domain.history.entity.History;
import java.util.Objects;

public class CardMoveRequest {

    private Long id;
    private String cardTitle;
    private long previousCardId;
    private long nextCardId;
    private Long toColumnId;
    private String previousColumnTitle;
    private String currentColumnTitle;

    public CardMoveRequest() {
    }

    public long getId() {
        return id;
    }

    public long getPreviousCardId() {
        return previousCardId;
    }

    public Long getNextCardId() {
        return nextCardId;
    }

    public String getCardTitle() {
        return cardTitle;
    }

    public Long getToColumnId() {
        return toColumnId;
    }

    public String getPreviousColumnTitle() {
        return previousColumnTitle;
    }

    public String getCurrentColumnTitle() {
        return currentColumnTitle;
    }

    public boolean isMovedColumn(Long fromColumnId) {
        return !Objects.equals(fromColumnId, toColumnId);
    }

    public History toHistory(Long memberId) {
        return new History(memberId, Action.MOVE.name(), cardTitle, previousColumnTitle, currentColumnTitle);
    }

    public Card toCardMove() {
        return new Card(id, toColumnId);
    }
}
