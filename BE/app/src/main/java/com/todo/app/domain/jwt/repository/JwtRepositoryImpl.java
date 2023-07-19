package com.todo.app.domain.jwt.repository;

import com.todo.app.common.exception.MemberDuplicationException;
import com.todo.app.domain.jwt.entity.Member;
import java.util.Map;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class JwtRepositoryImpl implements JwtRepository {

    private final NamedParameterJdbcTemplate template;

    public JwtRepositoryImpl(NamedParameterJdbcTemplate template) {
        this.template = template;
    }

    public Member findBy(String email) {
        String sql = "SELECT id, email, password, create_datetime FROM member WHERE email = :email";

        try {
            return template.queryForObject(sql, Map.of("email", email), memberRowMapper());
        } catch (DataAccessException e) {
            return null;
        }
    }

    public Member findByRefreshToken(String refreshToken) {
        String sql = "SELECT m.id, m.email, m.password, m.create_datetime "
                + "FROM member m "
                + "JOIN refresh_token r "
                + "ON m.id = r.member_id "
                + "WHERE r.refresh_token = :refreshToken";

        try {
            return template.queryForObject(sql, Map.of("refreshToken", refreshToken), memberRowMapper());
        } catch (DataAccessException e) {
            return null;
        }
    }

    public void saveMember(String email, String password) {
        String sql = "INSERT INTO member(email, password) VALUE (:email, :password)";

        try {
            template.update(sql, Map.of("email", email, "password", password));
        } catch (DuplicateKeyException e) {
            throw new MemberDuplicationException(email);
        }
    }

    public void saveRefreshToken(String refreshToken, Long memberId) {
        String sql = "INSERT INTO refresh_token(refresh_token, member_id) VALUE (:refreshToken, :memberId) "
                + "ON DUPLICATE KEY UPDATE refresh_token = :refreshToken";

        template.update(sql, Map.of("refreshToken", refreshToken, "memberId", memberId));
    }

    private RowMapper<Member> memberRowMapper() {
        return (rs, rowNum) -> new Member(
          rs.getLong("id"),
          rs.getString("email"),
          rs.getString("password"),
          rs.getString("create_datetime")
        );
    }

}
