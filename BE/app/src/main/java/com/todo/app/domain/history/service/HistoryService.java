package com.todo.app.domain.history.service;

import com.todo.app.domain.history.entity.History;
import com.todo.app.domain.history.repository.HistoryRepository;
import com.todo.app.domain.history.repository.RedisCacheRepository;
import java.util.List;
import org.springframework.scheduling.annotation.Scheduled;
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

    @Transactional(readOnly = true)
    public List<History> findHistories(Long memberId, Long historyId, int count) {
        return historyRepository.findHistories(memberId, historyId, count);
    }

    @Scheduled(cron = "0 */10 * * * *", zone = "Asia/Seoul")
    public void saveAll() {
        List<History> histories = redisCacheRepository.findAllHistory();

        if (histories.isEmpty()) {
            return;
        }

        historyRepository.saveAll(histories);
    }

    public void deleteAll(Long memberId) {
        historyRepository.deleteAll(memberId);
    }
}
