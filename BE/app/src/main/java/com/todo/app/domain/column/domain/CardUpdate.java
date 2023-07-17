package com.todo.app.domain.column.domain;

public class CardUpdate {

    private Long id;
    private String title;
    private String content;

    public CardUpdate(Long id, String title, String content) {
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
}
