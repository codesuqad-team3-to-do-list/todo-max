package com.todo.app.domain.column.repository;

import com.todo.app.common.exception.ResourceNotFoundException;
import com.todo.app.domain.column.domain.Card;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;
import org.springframework.dao.DataAccessException;
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
    public Optional<Long> findFirstCardWeightValue(Long columnId) {
        String sql = "SELECT weight_value "
                + "FROM tdl_card "
                + "WHERE tdl_column_id = :columnId AND deleted = 0 "
                + "ORDER BY weight_value "
                + "LIMIT 1";

        try (Stream<Long> result = template.queryForStream(sql, Map.of("columnId", columnId),
                (rs, num) -> rs.getLong("weight_value"))) {

            return result.findFirst();
        }
    }

    @Override
    public Card save(Card card) {
        String sql = "INSERT INTO tdl_card(tdl_column_id, title, content, weight_value) "
                + "VALUES(:tdlColumnId, :title, :content, :weightValue)";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        template.update(sql, mappingCreateCardSqlParameterSource(card), keyHolder);

        return new Card(keyHolder.getKey().longValue(), card.getColumnId(), card.getTitle(), card.getContent(), (card.getAuthor() == null)? "Web" : card.getAuthor());
    }

    @Override
    public boolean existsCard(Long cardId) {
        final String sql = "SELECT EXISTS (SELECT 1 FROM tdl_card WHERE id = :cardId)";

        return Boolean.TRUE.equals(template.queryForObject(sql, Map.of("cardId", cardId), Boolean.class));
    }

    @Override
    public Card update(Card card) {
        String sql = "UPDATE tdl_card SET title = :title, content = :content WHERE id = :id";

        try {
            template.update(sql, mappingUdateCardSqlParameterSource(card));
            return card;
        } catch (DataAccessException e) {
            throw new ResourceNotFoundException("Card", card.getId());
        }
    }

    @Override
    public void delete(Long cardId) {
        String sql = "UPDATE tdl_card "
                + "SET deleted = 1 "
                + "WHERE id = :cardId";

        template.update(sql, Map.of("cardId", cardId));
    }

    @Override
    public Optional<String> findTitleBy(Long cardId) {
        String sql = "SELECT title FROM tdl_card WHERE id = :cardId";

        try (Stream<String> result = template.queryForStream(sql, Map.of("cardId", cardId),
                (rs, num) -> rs.getString("title"))) {

            return result.findFirst();
        }
    }

    @Override
    public List<Card> findAllBy(Long memberId) {
        String sql = "SELECT card.id, tdl_column_id, card.title, card.weight_value, content, author "
                + "FROM tdl_card card "
                + "LEFT JOIN tdl_column as cl "
                + "ON tdl_column_id = cl.id "
                + "WHERE card.deleted = 0 "
                + "AND member_id = :memberId";
        return template.query(sql, Map.of("memberId", memberId), cardRowMapper());
    }

    @Override
    public void updateMove(Card card) {
        String sql = "UPDATE tdl_card "
                + "SET tdl_column_id = :columnId, weight_value = :weightValue "
                + "WHERE id = :id";

        template.update(sql, mappingUpdateWeightValueSqlParameterSource(card));
    }

    @Override
    public List<Long> findWeightsBy(Long prevId, Long nextId) {
        String sql = "SELECT weight_value "
                + "FROM tdl_card "
                + "WHERE id = :prevId OR id = :nextId";

        return template.query(sql, mappingfindWeightsSqlParameterSource(prevId, nextId), (rs, rowNum) -> rs.getLong("weight_value"));
    }

    @Override
    public List<Card> findCardsBy(Long columnId) {
        String sql = "SELECT id, tdl_column_id, title, content, author, weight_value "
                + "FROM tdl_card card "
                + "WHERE card.tdl_column_id = :columnId "
                + "AND deleted = 0 "
                + "ORDER BY weight_value ";

        return template.query(sql, Map.of("columnId", columnId), cardRowMapper());
    }

    @Override
    public void updateWeightValueCards(List<Card> cards) {
        String sql = "UPDATE tdl_card SET weight_value = :weightValue WHERE id = :id";

        template.batchUpdate(sql, SqlParameterSourceUtils.createBatch(cards));
    }

    private RowMapper<Card> cardRowMapper() {
        return (rs, rowNum) -> new Card(
                rs.getLong("id"),
                rs.getLong("tdl_column_id"),
                rs.getString("title"),
                rs.getString("content"),
                rs.getString("author"),
                rs.getLong("weight_value"),
                false
        );
    }

    private SqlParameterSource mappingCreateCardSqlParameterSource(Card card) {
        return new MapSqlParameterSource()
                .addValue("tdlColumnId", card.getColumnId())
                .addValue("title", card.getTitle())
                .addValue("content", card.getContent())
                .addValue("weightValue", card.getWeightValue());
    }

    private SqlParameterSource mappingUdateCardSqlParameterSource(Card card) {
        return new MapSqlParameterSource()
                .addValue("id", card.getId())
                .addValue("title", card.getTitle())
                .addValue("content", card.getContent());
    }

    private SqlParameterSource mappingUpdateWeightValueSqlParameterSource(Card card) {
        return new MapSqlParameterSource()
                .addValue("id", card.getId())
                .addValue("columnId", card.getColumnId())
                .addValue("weightValue", card.getWeightValue());
    }

    private SqlParameterSource mappingfindWeightsSqlParameterSource(Long prevId, Long nextId) {
        return new MapSqlParameterSource()
                .addValue("prevId", prevId)
                .addValue("nextId", nextId);
    }
}
