package com.todo.app.common.exception;

import com.todo.app.domain.jwt.controller.response.JwtTokenType;
import org.springframework.http.HttpStatus;

public class IllegalJwtTokenException extends CustomBusinessException {
    private static final HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;

    public IllegalJwtTokenException(String message) {
        super(httpStatus, "[Token 인증 오류]: " + message);
    }

    public IllegalJwtTokenException(JwtTokenType tokenType) {
        super(httpStatus, "[Token 인증 오류]: 잘못된 " + tokenType.name() + " 토큰 입니다.");
    }

    @Override
    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
