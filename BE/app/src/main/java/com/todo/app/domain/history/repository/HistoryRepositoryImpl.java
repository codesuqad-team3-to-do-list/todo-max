package com.todo.app.domain.history.repository;

import com.todo.app.domain.history.entity.History;
import java.util.List;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSourceUtils;
import org.springframework.stereotype.Repository;

@Repository
public class HistoryRepositoryImpl implements HistoryRepository {

    private final NamedParameterJdbcTemplate template;

    public HistoryRepositoryImpl(NamedParameterJdbcTemplate template) {
        this.template = template;
    }

    @Override
    public void saveAll(List<History> histories) {
        String sql = "INSERT INTO history (member_id, action, tdl_card_title, tdl_column_previous_title, tdl_column_current_title, action_datetime) "
                + " VALUES (:memberId, :action, :cardTitle, :prevColumnTitle, :currentColumnTitle, :actionDatetime)";

        template.batchUpdate(sql, SqlParameterSourceUtils.createBatch(histories));
    }

    @Override
    public List<History> findHistories(Long memberId, Long historyId, int count) {
        StringBuilder sql = new StringBuilder()
                .append("SELECT id, action, tdl_card_title, tdl_column_current_title, tdl_column_previous_title, action_datetime ")
                .append("FROM history ")
                .append("WHERE member_id = :memberId AND deleted = 0 ");
        if (historyId > 0L) {
            sql.append("AND id < :historyId ");
        }

        sql.append("ORDER BY id DESC LIMIT :count");

        final MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("memberId", memberId)
                .addValue("historyId", historyId)
                .addValue("count", count + 1);

        return template.query(sql.toString(), params, historyRowMapper());
    }

    private RowMapper<History> historyRowMapper() {
        return (rs, rowNum) -> new History(
                rs.getLong("id"),
                rs.getString("action"),
                rs.getString("tdl_card_title"),
                rs.getString("tdl_column_current_title"),
                rs.getString("tdl_column_previous_title"),
                rs.getTimestamp("action_datetime").toLocalDateTime()
        );
    }
}