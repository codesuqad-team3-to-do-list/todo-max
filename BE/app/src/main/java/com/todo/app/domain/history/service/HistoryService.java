package com.todo.app.domain.history.service;

import com.todo.app.domain.history.entity.History;
import com.todo.app.domain.history.repository.HistoryRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class HistoryService {

    private final HistoryRepository historyRepository;

    public HistoryService(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    public void save(History history) {
        historyRepository.save(history);
    }

//    @Transactional(readOnly = true)  // TODO: tansactional이랑 @schediled 어노테이션 같이 쓰면 오류 발생함
    public List<History> findHistories(Long memberId, Long historyId, int count) {
        if (historyId == 0L) {
            historyId = historyRepository.findLatestHistoryId(memberId);
        }
        return historyRepository.findHistories(memberId, historyId, count);
    }

    public void deleteAll(Long memberId) {
        historyRepository.deleteAll(memberId);
    }
}
