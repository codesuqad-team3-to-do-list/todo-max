package com.todo.app.common.exception;

import org.springframework.http.HttpStatus;

public class MemberDuplicationException extends RuntimeException {

    private final HttpStatus httpStatus = HttpStatus.BAD_REQUEST;

    public MemberDuplicationException(String email) {
        super("해당 이메일은 이미 가입된 이메일 입니다. : " + email);
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
