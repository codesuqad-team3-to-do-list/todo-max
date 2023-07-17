package com.todo.app.domain.jwt.repository;

import com.todo.app.domain.jwt.entity.Member;

public interface JwtRepository {

    Member findBy(String email);
}
