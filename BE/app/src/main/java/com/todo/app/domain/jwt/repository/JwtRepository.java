package com.todo.app.domain.jwt.repository;

import com.todo.app.domain.jwt.entity.Member;

public interface JwtRepository {

    Member findBy(String email);
    void saveRefreshToken(String refreshToken, Long memberId);
    void saveMember(String email, String password);
    Member findByRefreshToken(String refreshToken);
}
