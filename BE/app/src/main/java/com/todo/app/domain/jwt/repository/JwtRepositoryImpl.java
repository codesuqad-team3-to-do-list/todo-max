package com.todo.app.domain.jwt.repository;

import com.todo.app.domain.jwt.entity.Member;
import java.util.Map;
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

        return template.queryForObject(sql, Map.of("email", email), memberRowMapper());
    }

    public void saveRefreshToken(String refreshToken, Long memberId) {
        String sql = "INSERT INTO refresh_token(refresh_token, member_id) VALUE (:refreshToken, :memberId)";

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
