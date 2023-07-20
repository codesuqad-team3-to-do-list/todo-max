package com.todo.app.common.exception;

import org.springframework.http.HttpStatus;

public class CustomBusinessException extends RuntimeException {

    private final HttpStatus httpStatus;

    public CustomBusinessException(HttpStatus httpStatus, String message) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
