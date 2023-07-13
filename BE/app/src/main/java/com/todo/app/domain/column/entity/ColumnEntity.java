package com.todo.app.domain.column.entity;

import com.todo.app.domain.column.domain.Column;

public class ColumnEntity {

    private final Long id;
    private final Long memberId;
    private final String title;

    public ColumnEntity(Long id, Long memberId, String title) {
        this.id = id;
        this.memberId = memberId;
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public Long getMemberId() {
        return memberId;
    }

    public String getTitle() {
        return title;
    }

    public Column toDomain() {
        return new Column(id, memberId, title);
    }
}
