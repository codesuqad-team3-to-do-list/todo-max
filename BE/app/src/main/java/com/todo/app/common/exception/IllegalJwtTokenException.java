package com.todo.app.common.exception;

import com.todo.app.domain.jwt.controller.response.JwtTokenType;
import org.springframework.http.HttpStatus;

public class IllegalJwtTokenException extends  RuntimeException {
    private final HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;

    public IllegalJwtTokenException(String message) {
        super("[Token 인증 오류]: " + message);
    }

    public IllegalJwtTokenException(JwtTokenType tokenType) {
        super("[Token 인증 오류]: 잘못된 " + tokenType.name() + " 토큰 입니다.");
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
