package com.todo.app.domain.column.domain;

public class Card {

    private Long id;
    private Long columnId;
    private String title;
    private String content;
    private String author;
    public Long weightValue;
    public boolean deleted;

    public Card(Long id, Long columnId, String title, String content, String author, Long weightValue, boolean deleted) {
        this.id = id;
        this.columnId = columnId;
        this.title = title;
        this.content = content;
        this.author = author;
        this.weightValue = weightValue;
        this.deleted = deleted;
    }

    public Card(Long id, Long columnId, String title, String author) {
        this.id = id;
        this.columnId = columnId;
        this.title = title;
    }

    public Card(Long id, Long columnId, String title, String content, String autor) {
        this.id = id;
        this.columnId = columnId;
        this.title = title;
        this.content = content;
    }

    public Card(Long id, Long columnId) {
        this.id = id;
        this.columnId = columnId;
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

    public Long getWeightValue() {
        return weightValue;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void resizeWeightValue(Long weightValue) {
        this.weightValue = weightValue;
    }

    public void resizeWeightValue(Long pervWeightValue, Long nextWeightValue) {
        this.weightValue = Math.floorDiv(pervWeightValue + nextWeightValue, 2);
    }
}
