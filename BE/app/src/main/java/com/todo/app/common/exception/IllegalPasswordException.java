package com.todo.app.common.exception;

import org.springframework.http.HttpStatus;

public class IllegalPasswordException extends RuntimeException {

    private final HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;

    public IllegalPasswordException(Long memberId) {
        super(memberId + "의 패스워드가 일치하지 않습니다.");
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
