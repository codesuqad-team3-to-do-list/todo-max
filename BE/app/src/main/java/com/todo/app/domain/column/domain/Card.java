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
        this.author = (author == null)? "Web" : author;
        this.weightValue = weightValue;
        this.deleted = deleted;
    }

    public Card(Long id, Long columnId, String title, String content, String author) {
        this(id, columnId, title, content, (author == null)? "Web" : author, 0L, false);
    }

    public Card(Long id, Long columnId) {
        this.id = id;
        this.columnId = columnId;
    }

    private Card() {
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

    public void assignWeightValue(Long weightValue) {
        this.weightValue = weightValue;
    }

    public void assignWeightValueAverage(Long pervWeightValue, Long nextWeightValue) {
        this.weightValue = Math.floorDiv(pervWeightValue + nextWeightValue, 2);
    }

    public static Card createCard(Long columnId, String title, String content) {
        final Card card = new Card();
        card.columnId = columnId;
        card.title = title;
        card.content = content;

        return card;
    }

    public static Card updateCard(Long id, String title, String content) {
        final Card card = new Card();
        card.id = id;
        card.title = title;
        card.content = content;
        card.author = "Web";

        return card;
    }
}
