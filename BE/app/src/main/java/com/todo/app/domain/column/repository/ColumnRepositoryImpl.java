package com.todo.app.domain.column.repository;

import com.todo.app.domain.column.domain.Column;
import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ColumnRepositoryImpl implements ColumnRepository {

    private final NamedParameterJdbcTemplate template;

    public ColumnRepositoryImpl(NamedParameterJdbcTemplate template) {
        this.template = template;
    }

    @Override
    public List<Column> findAllBy(Long memberId) {
        String sql = "SELECT id, member_id, title FROM tdl_column WHERE deleted = 0 AND member_id = :memberId";

        return template.query(sql, Map.of("memberId", memberId), columnRowMapper());
    }

    private RowMapper<Column> columnRowMapper() {
        return (rs, rowNum) -> new Column(
                rs.getLong("id"),
                rs.getLong("member_id"),
                rs.getString("title")
        );
    }
}
