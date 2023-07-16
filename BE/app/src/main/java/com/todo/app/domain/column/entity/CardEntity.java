package com.todo.app.domain.column.entity;

import com.todo.app.domain.column.domain.Card;

public class CardEntity {

    private Long id;
    private Long columnId;
    private String title;
    private String content;
    private String author;


    public CardEntity(Long id, Long columnId, String title, String content, String author) {
        this.id = id;
        this.columnId = columnId;
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public Long getId() {
        return id;
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

    public String getAuthor() {
        return author;
    }

    public Card toDomain() {
        return new Card(id, columnId, title, content, author);
    }
}
