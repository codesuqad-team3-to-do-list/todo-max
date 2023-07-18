package com.todo.app.domain.column.repository;

import com.todo.app.domain.column.domain.Card;
import com.todo.app.domain.column.domain.CardCreate;
import com.todo.app.domain.column.domain.CardUpdate;
import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSourceUtils;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class CardRepositoryImpl implements CardRepository {

    private final NamedParameterJdbcTemplate template;

    public CardRepositoryImpl(NamedParameterJdbcTemplate template) {
        this.template = template;
    }

    @Override
    public Card save(CardCreate card) {

        String sql = "INSERT INTO tdl_card(tdl_column_id, title, content) "
                + "VALUES(:tdlColumnId, :title, :content)";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        template.update(sql, mappingCreateCardSqlParameterSource(card), keyHolder);

        return new Card(keyHolder.getKey().longValue(), card.getColumnId(), card.getTitle(), card.getContent(), "web");
    }

    @Override
    public boolean existsCard(Long cardId) {
        final String sql = "SELECT EXISTS (SELECT 1 FROM tdl_card WHERE id = :cardId)";

        return Boolean.TRUE.equals(template.queryForObject(sql, Map.of("cardId", cardId), Boolean.class));
    }

    @Override
    public void update(CardUpdate card) {
        String sql = "UPDATE tdl_card SET title = :title, content = :content WHERE id = :id";

        template.update(sql, mappingUdateCardSqlParameterSource(card));
    }

    @Override
    public void delete(Long cardId) {
        String sql = "UPDATE tdl_card "
                + "SET deleted = 1 "
                + "WHERE id = :cardId";

        template.update(sql, Map.of("cardId", cardId));
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

    private RowMapper<CardEntity> cardRowMapper() {
        return (rs, rowNum) -> new CardEntity(
                rs.getLong("id"),
                rs.getLong("tdl_column_id"),
                rs.getString("title"),
                rs.getString("content"),
                rs.getString("author"),
                rs.getLong("weight_value"),
                false
        );
    }

    private SqlParameterSource mappingCreateCardSqlParameterSource(CardCreate card) {
        return new MapSqlParameterSource()
                .addValue("tdlColumnId", card.getColumnId())
                .addValue("title", card.getTitle())
                .addValue("content", card.getContent());
    }

    private SqlParameterSource mappingUdateCardSqlParameterSource(CardUpdate card) {
        return new MapSqlParameterSource()
                .addValue("id", card.getId())
                .addValue("title", card.getTitle())
                .addValue("content", card.getContent());
    }
}