package com.todo.app.domain.jwt.controller.response;

import com.todo.app.common.exception.JwtExceptionType;

public class JwtExceptionResponse {

    private final String exceptionType;
    private final String message;

    public JwtExceptionResponse(JwtExceptionType exceptionType) {
        this.exceptionType = exceptionType.name();
        this.message = exceptionType.getMessage();
    }

    public String getExceptionType() {
        return exceptionType;
    }

    public String getMessage() {
        return message;
    }
}
