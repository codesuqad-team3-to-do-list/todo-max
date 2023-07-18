package com.todo.app.domain.jwt.entity;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class JwtProvider {

    private static final byte[] secret = "codesquad-todo-03-app-jinny-ape-bean-joy".getBytes();
    private final Key key = Keys.hmacShaKeyFor(secret);

    public String createToken(Map<String, Object> claims, Date expireDate) {
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(expireDate)
                .signWith(key)
                .compact();
    }

    /**
     * 파라미터로 입력받은 token에서 Claims을 추출한다. 추출 하면서 토큰 검증도 같이 한다. 토큰 검증에 실패한 경우 JwtException 을 발생시킨다.
     * @param token Claims를 추출할 토큰 문자열
     * @return 토큰의 Claims
     */
    public Claims getClaims(String token) {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
    }

    public Jwt createJwt(Map<String, Object> claims) {
        String accessToken = createToken(claims, getExpireDateAccessToken());
        String refreshToken = createToken(new HashMap<>(), getExpireDateRefreshToken());
        return new Jwt(accessToken, refreshToken);
    }

    public Jwt reissueAccessToken(Map<String, Object> claims, String refreshToken) {
        String accessToken = createToken(claims, getExpireDateAccessToken());
        return new Jwt(accessToken, refreshToken);
    }

    public Date getExpireDateAccessToken() {
        long expireTimeMils = 1000L * 60 * 60;
        return new Date(System.currentTimeMillis() + expireTimeMils);
    }

    public Date getExpireDateRefreshToken() {
        long expireTimeMils = 1000L * 60 * 60 * 24 * 60;
        return new Date(System.currentTimeMillis() + expireTimeMils);
    }

}
