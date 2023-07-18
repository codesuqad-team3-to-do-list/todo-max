package com.todo.app.domain.history.controller;

import com.todo.app.common.ApiResponse;
import com.todo.app.domain.history.controller.response.HistoriesResponse;
import com.todo.app.domain.history.entity.History;
import com.todo.app.domain.history.service.HistoryService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HistoryController {

    private final HistoryService historyService;

    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping("/api/histories")
    public ApiResponse<HistoriesResponse> getHistories(@RequestParam(defaultValue = "0") Long historyId, @RequestParam(defaultValue = "10") int count) {
        if (historyId == 0L) {
            historyService.saveAll();
        }

        List<History> histories = historyService.findHistories(1L, historyId, count);

        return ApiResponse.success(HttpStatus.OK, HistoriesResponse.of(histories, count));
    }

    @DeleteMapping("/api/histories")
    public ApiResponse<Void> deleteAll() {
        historyService.saveAll();
        historyService.deleteAll(1L);

        return ApiResponse.success(HttpStatus.OK);
    }
}
