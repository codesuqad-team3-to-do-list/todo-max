package com.todo.app.domain.column.controller.request;

import com.todo.app.domain.column.domain.CardCreate;

public class CardCreateRequest {

    private String title;
    private String content;

    public CardCreateRequest() {}

    public CardCreateRequest(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public CardCreate toCardCreate(Long columnId) {
        return new CardCreate(columnId, title, content);
    }

}
