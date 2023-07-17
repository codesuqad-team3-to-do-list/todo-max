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
    private final JwtProvider jwtProvider;

    public JwtService(JwtRepository jwtRepository, JwtProvider jwtProvider) {
        this.jwtRepository = jwtRepository;
        this.jwtProvider = jwtProvider;
    }

    public Jwt login(String email, String password) {
        Member member = jwtRepository.findBy(email);

        if(!verifyPassword(member, password)) {
            throw new IllegalPasswordException(member.getId());
        }

        Jwt jwt = jwtProvider.createJwt(generateMemberClaims(member));

        jwtRepository.saveRefreshToken(jwt.getRefreshToken(), member.getId());

        return jwt;
    }

    private Map<String, Object> generateMemberClaims(Member member) {
        return Map.of(
                "id", member.getId()
        );
    }

    private boolean verifyPassword(Member member, String password) {
        return member.getPassword().equals(password);
    }

}
