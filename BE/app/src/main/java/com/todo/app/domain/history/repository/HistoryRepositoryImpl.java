package com.todo.app.domain.history.repository;

import com.todo.app.domain.history.entity.History;
import java.util.List;
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
}
