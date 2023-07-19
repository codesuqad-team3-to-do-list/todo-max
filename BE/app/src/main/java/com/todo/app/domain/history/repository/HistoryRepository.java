package com.todo.app.domain.history.repository;

import com.todo.app.domain.history.entity.History;
import java.util.List;

public interface HistoryRepository {

    Long findLatestHistoryId(Long memberId);
    void save(History history);
    List<History> findHistories(Long memberId, Long historyId, int count);
    void deleteAll(Long memberId);
}
