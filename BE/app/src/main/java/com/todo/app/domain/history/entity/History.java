package com.todo.app.domain.history.entity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import java.time.LocalDateTime;

public class History {
    private Long id;
    private Long memberId;
    private String action;
    private String cardTitle;
    private String prevColumnTitle;
    private String currentColumnTitle;
    private boolean deleted;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime actionDatetime;

    public History() {
    }

    public History(Long memberId, String action, String cardTitle) {
        this.memberId = memberId;
        this.action = action;
        this.cardTitle = cardTitle;
        this.actionDatetime = LocalDateTime.now();
    }

    public History(Long memberId, String action, String cardTitle, String prevColumnTitle, String currentColumnTitle) {
        this.memberId = memberId;
        this.action = action;
        this.cardTitle = cardTitle;
        this.prevColumnTitle = prevColumnTitle;
        this.currentColumnTitle = currentColumnTitle;
        this.actionDatetime = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public Long getMemberId() {
        return memberId;
    }

    public String getAction() {
        return action;
    }

    public String getCardTitle() {
        return cardTitle;
    }

    public String getPrevColumnTitle() {
        return prevColumnTitle;
    }

    public String getCurrentColumnTitle() {
        return currentColumnTitle;
    }

    public LocalDateTime getActionDatetime() {
        return actionDatetime;
    }

    public boolean isDeleted() {
        return deleted;
    }
}
