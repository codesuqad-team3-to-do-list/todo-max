package com.todo.app.domain.jwt.controller.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginRequest {

    private final String email;
    private final String password;

    public LoginRequest(@JsonProperty("email") String email, @JsonProperty("password") String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
