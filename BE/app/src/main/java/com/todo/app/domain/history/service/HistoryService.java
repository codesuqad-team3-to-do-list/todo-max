package com.todo.app.domain.history.service;

import com.todo.app.domain.column.repository.RedisCacheRepository;
import com.todo.app.domain.history.entity.History;
import com.todo.app.domain.history.repository.HistoryRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class HistoryService {
    private final RedisCacheRepository redisCacheRepository;

    private final HistoryRepository historyRepository;

    public HistoryService(RedisCacheRepository redisCacheRepository, HistoryRepository historyRepository) {
        this.redisCacheRepository = redisCacheRepository;
        this.historyRepository = historyRepository;
    }

    public void cache(History history) {
        redisCacheRepository.saveHistory(history);
    }

    public void saveAll() {
        List<History> histories = redisCacheRepository.findAllHistory();

        if (histories.isEmpty()) {
            return;
        }

        historyRepository.saveAll(histories);
    }
}
