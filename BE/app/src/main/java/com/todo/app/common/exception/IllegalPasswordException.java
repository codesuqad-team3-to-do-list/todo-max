package com.todo.app.common.exception;

import org.springframework.http.HttpStatus;

public class IllegalPasswordException extends CustomBusinessException {

    private static final HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;

    public IllegalPasswordException() {
        super(httpStatus, "비밀번호가 일치하지 않거나 없는 회원입니다.");
    }

    @Override
    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
