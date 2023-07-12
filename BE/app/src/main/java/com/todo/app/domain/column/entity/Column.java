package com.todo.app.domain.column.entity;

import java.util.List;

public class Column {

    private final Long id;
    private final Long memberId;
    private String title;
    private List<Card> cards;

    public Column(Long id, Long memberId, String title) {
        this.id = id;
        this.memberId = memberId;
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }

    public Long getMemberId() {
        return memberId;
    }

    public String getTitle() {
        return title;
    }

    public List<Card> getCards() {
        return cards;
    }
}
