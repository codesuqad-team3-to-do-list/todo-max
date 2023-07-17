package com.todo.app.common.exception;

import org.springframework.http.HttpStatus;

public class IllegalJwtTokenException extends  RuntimeException {
    private final HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;

    public IllegalJwtTokenException(String message) {
        super("[Token 인증 오류]: " + message);
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
