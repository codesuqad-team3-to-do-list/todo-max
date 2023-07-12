package com.todo.app.domain.column.controller;

import com.todo.app.common.ApiResponse;
import com.todo.app.domain.column.controller.response.ColumnResponse;
import com.todo.app.domain.column.service.ColumnService;
import com.todo.app.domain.column.service.ColumnServiceImpl;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ColumnController {

    private final ColumnService columnService;

    public ColumnController(ColumnService columnService) {
        this.columnService = columnService;
    }

    @GetMapping("/api/columns")
    public ApiResponse<List<ColumnResponse>> readColumns() {
        List<ColumnResponse> columnResponses = columnService.readAll(1L).stream()// TODO: 로그인 기능 구현 후 readAll() 파라미터 수정 필요
                .map(ColumnResponse::from)
                .collect(Collectors.toList());
        return ApiResponse.success(HttpStatus.OK, columnResponses);
    }
}
