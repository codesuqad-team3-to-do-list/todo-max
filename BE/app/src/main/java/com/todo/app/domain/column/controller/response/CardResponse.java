package com.todo.app.domain.column.controller.response;

import com.todo.app.domain.column.domain.Card;

public class CardResponse {

    private Long id;
    private String title;
    private String content;
    private String author;

    public CardResponse(Long id, String title, String content, String author) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getAuthor() {
        return author;
    }

    public static CardResponse from(Card card) {
        return new CardResponse(card.getId(), card.getTitle(), card.getContent(), card.getAuthor());
    }
}
