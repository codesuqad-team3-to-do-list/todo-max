package com.todo.app.domain.history.controller.response;

import com.todo.app.domain.history.entity.History;
import java.util.List;
import java.util.stream.Collectors;

public class HistoriesResponse {
    private List<HistoryResponse> histories;

    private boolean hasNext;

    public HistoriesResponse(List<HistoryResponse> histories, boolean hasNext) {
        this.histories = histories;
        this.hasNext = hasNext;
    }

    public HistoriesResponse() {
    }

    public List<HistoryResponse> getHistories() {
        return histories;
    }

    public boolean isHasNext() {
        return hasNext;
    }

    public static HistoriesResponse of(List<History> histories, int count) {
        final List<HistoryResponse> historyResponses = toHistoryResponses(histories, count);
        final boolean hasNext = histories.size() > count;

        return new HistoriesResponse(historyResponses, hasNext);
    }

    private static List<HistoryResponse> toHistoryResponses(List<History> histories, int count) {
        return histories.subList(0, Math.min(histories.size(), count))
                .stream()
                .map(HistoryResponse::from)
                .collect(Collectors.toList());
    }
}
