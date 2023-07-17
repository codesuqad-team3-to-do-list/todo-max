package com.todo.app.domain.column.controller.request;


import com.todo.app.domain.column.domain.CardUpdate;

public class CardUpdateRequest {

    private Long id;
    private String title;
    private String content;

    public CardUpdateRequest() {}

    public CardUpdateRequest(Long id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
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


    public CardUpdate toCardUpdate() {
        return new CardUpdate(id, title, content);
    }

}
