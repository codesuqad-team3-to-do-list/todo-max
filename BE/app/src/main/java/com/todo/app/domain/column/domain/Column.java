package com.todo.app.domain.column.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

    public void matchCards(List<Card> cards) {
        List<Card> temp = new ArrayList<>();

        for (Card card : cards) {
            if (Objects.equals(id, card.getColumnId())) {
                temp.add(card);
            }
        }

        this.cards = temp;
    }
}
