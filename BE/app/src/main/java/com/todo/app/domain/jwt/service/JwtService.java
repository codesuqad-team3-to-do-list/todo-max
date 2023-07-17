package com.todo.app.domain.jwt.service;

import com.todo.app.common.exception.IllegalPasswordException;
import com.todo.app.domain.jwt.entity.Jwt;
import com.todo.app.domain.jwt.entity.JwtProvider;
import com.todo.app.domain.jwt.entity.Member;
import com.todo.app.domain.jwt.repository.JwtRepository;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private final JwtRepository jwtRepository;

    public JwtService(JwtRepository jwtRepository) {
        this.jwtRepository = jwtRepository;
    }

    public Jwt login(String email, String password) {
        Member member = jwtRepository.findBy(email);

        if(!verifyPassword(member, password)) {
            throw new IllegalPasswordException(member.getId());
        }

        JwtProvider jwtProvider = new JwtProvider();
        Map<String, Object> accessClaims = Map.of("memberId", member.getId());

        Jwt jwt = jwtProvider.createJwt(accessClaims);

        jwtRepository.saveRefreshToken(jwt.getRefreshToken(), member.getId());

        return jwt;
    }

    private boolean verifyPassword(Member member, String password) {
        return member.getPassword().equals(password);
    }

}
