package com.todo.app.domain.column.controller;

import com.todo.app.common.ApiResponse;
import com.todo.app.domain.column.controller.response.ColumnResponse;
import com.todo.app.domain.column.service.ColumnService;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
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
    public ApiResponse<List<ColumnResponse>> readColumns(HttpServletRequest request) {
        List<ColumnResponse> columnResponses = columnService.readAll(Long.valueOf(String.valueOf(request.getAttribute("memberId"))))
                .stream() // TODO: 로그인 기능 구현 후 readAll() 파라미터 수정 필요
                .map(ColumnResponse::from)
                .collect(Collectors.toList());
        return ApiResponse.success(HttpStatus.OK, columnResponses);
    }
}
