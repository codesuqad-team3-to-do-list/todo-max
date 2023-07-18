package com.todo.app.domain.jwt.entity;

public class Jwt {
    private final String accessToken;
    private final String refreshToken;

    public Jwt(String accessToken, String refreshToken){
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }
}
