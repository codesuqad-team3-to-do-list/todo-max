package com.todo.app.domain.jwt.service;

import com.todo.app.common.exception.IllegalJwtTokenException;
import com.todo.app.common.exception.IllegalPasswordException;
import com.todo.app.domain.jwt.controller.response.JwtTokenType;
import com.todo.app.domain.jwt.entity.Jwt;
import com.todo.app.domain.jwt.entity.JwtProvider;
import com.todo.app.domain.jwt.entity.Member;
import com.todo.app.domain.jwt.repository.JwtRepository;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
            throw new IllegalPasswordException();
        }

        Jwt jwt = jwtProvider.createJwt(generateMemberClaims(member));

        jwtRepository.saveRefreshToken(jwt.getRefreshToken(), member.getId());

        return jwt;
    }

    @Transactional
    public Jwt renewAccessToken(String refreshToken) {
        jwtProvider.getClaims(refreshToken);
        Member member = jwtRepository.findByRefreshToken(refreshToken);
        if(member == null) {
            throw new IllegalJwtTokenException(JwtTokenType.REFRESH);
        }

        return jwtProvider.reissueAccessToken(generateMemberClaims(member), refreshToken);
    }

    private Map<String, Object> generateMemberClaims(Member member) {
        return Map.of(
                "memberId", member.getId()
        );
    }

    private boolean verifyPassword(Member member, String password) {
        return member != null && member.getPassword().equals(password);
    }

}
