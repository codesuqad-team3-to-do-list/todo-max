package com.todo.app.domain.column.repository;

import com.todo.app.domain.column.entity.Card;
import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CardRepositoryImpl implements CardRepository {

    private final NamedParameterJdbcTemplate template;

    public CardRepositoryImpl(NamedParameterJdbcTemplate template) {
        this.template = template;
    }

    @Override
    public List<Card> findAllBy(Long memberId) {
        String sql = "SELECT card.id, tdl_column_id, card.title, content, author "
                + "FROM tdl_card card "
                + "LEFT JOIN tdl_column as cl "
                + "ON tdl_column_id = cl.id "
                + "WHERE card.deleted = 0 "
                + "AND member_id = :memberId";

        return template.query(sql, Map.of("memberId", memberId), cardRowMapper());
    }

    private RowMapper<Card> cardRowMapper() {
        return (rs, rowNum) -> new Card(
                rs.getLong("id"),
                rs.getLong("tdl_column_id"),
                rs.getString("title"),
                rs.getString("content"),
                rs.getString("author")
        );
    }
}
