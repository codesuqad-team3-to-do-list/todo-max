package com.todo.app.domain.jwt.controller.request;

public class JwtRefreshTokenRequest {

    private String refreshToken;

    public JwtRefreshTokenRequest() {}

    public JwtRefreshTokenRequest(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }
}
