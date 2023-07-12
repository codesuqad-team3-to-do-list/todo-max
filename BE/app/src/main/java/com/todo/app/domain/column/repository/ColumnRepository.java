package com.todo.app.domain.column.repository;

import com.todo.app.domain.column.domain.Column;
import java.util.List;

public interface ColumnRepository {
    List<Column> findAllBy(Long memberId);
}
