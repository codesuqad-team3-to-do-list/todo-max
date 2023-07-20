package com.todo.app.common.exception;

import org.springframework.http.HttpStatus;

public class MemberDuplicationException extends CustomBusinessException {

    private static final HttpStatus httpStatus = HttpStatus.BAD_REQUEST;

    public MemberDuplicationException(String email) {
        super(httpStatus, "해당 이메일은 이미 가입된 이메일 입니다. : " + email);
    }

    @Override
    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
