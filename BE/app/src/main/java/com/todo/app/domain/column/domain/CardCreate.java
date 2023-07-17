package com.todo.app.domain.column.domain;

public class CardCreate {

    private Long columnId;
    private String title;
    private String content;

    public CardCreate(Long columnId, String title, String content) {
        this.columnId = columnId;
        this.title = title;
        this.content = content;
    }

    public Long getColumnId() {
        return columnId;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

}
