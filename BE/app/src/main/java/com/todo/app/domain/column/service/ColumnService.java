package com.todo.app.domain.column.service;

import com.todo.app.domain.column.domain.Column;
import java.util.List;

public interface ColumnService {
    List<Column> readAll(Long memberId);
}
