package com.todo.app.domain.jwt.controller.response;

import com.todo.app.domain.jwt.entity.Jwt;

public class JwtResponse {

    private final String accessToken;
    private final String refreshToken;

    public JwtResponse(String accessToken, String refreshToken){
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public static JwtResponse from(Jwt jwt) {
        return new JwtResponse(jwt.getAccessToken(), jwt.getRefreshToken());
    }
}
