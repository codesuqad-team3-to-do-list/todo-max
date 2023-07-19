package com.todo.app.common.exception;

import org.springframework.http.HttpStatus;

public class IllegalPasswordException extends RuntimeException {

    private final HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;

    public IllegalPasswordException() {
        super("비밀번호가 일치하지 않거나 없는 회원입니다.");
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
