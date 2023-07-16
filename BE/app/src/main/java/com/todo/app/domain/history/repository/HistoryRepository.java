package com.todo.app.domain.history.repository;

import com.todo.app.domain.history.entity.History;
import java.util.List;

public interface HistoryRepository {
    void saveAll(List<History> histories);

    List<History> findHistories(Long memberId, Long historyId, int count);
}
