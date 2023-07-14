package com.todo.app.domain.history.controller.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.todo.app.domain.history.entity.History;
import java.time.LocalDateTime;

public class HistoryResponse {
    private Long id;
    private String action;
    private String cardTitle;
    @JsonInclude(Include.NON_NULL)
    private String previousColumnTitle;
    @JsonInclude(Include.NON_NULL)
    private String currentColumnTitle;
    private LocalDateTime actionDatetime;

    public HistoryResponse() {
    }

    public HistoryResponse(Long id, String action, String cardTitle, String previousColumnTitle,
                           String currentColumnTitle,
                           LocalDateTime actionDatetime) {
        this.id = id;
        this.action = action;
        this.cardTitle = cardTitle;
        this.previousColumnTitle = previousColumnTitle;
        this.currentColumnTitle = currentColumnTitle;
        this.actionDatetime = actionDatetime;
    }

    public Long getId() {
        return id;
    }

    public String getAction() {
        return action;
    }

    public String getCardTitle() {
        return cardTitle;
    }

    public String getPreviousColumnTitle() {
        return previousColumnTitle;
    }

    public String getCurrentColumnTitle() {
        return currentColumnTitle;
    }

    public LocalDateTime getActionDatetime() {
        return actionDatetime;
    }

    public static HistoryResponse from(History history) {
        return new HistoryResponse(
                history.getId(),
                history.getAction(),
                history.getCardTitle(),
                history.getPrevColumnTitle(),
                history.getCurrentColumnTitle(),
                history.getActionDatetime()
        );
    }
}
