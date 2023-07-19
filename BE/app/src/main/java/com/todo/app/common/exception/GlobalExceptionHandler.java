package com.todo.app.common.exception;

import com.todo.app.common.ApiResponse;
import com.todo.app.domain.jwt.controller.response.JwtExceptionResponse;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ApiResponse<String> handleException(Exception ex) {
        return ApiResponse.exception(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ApiResponse<String> handleException(IllegalArgumentException ex) {
        return ApiResponse.exception(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ApiResponse<String> handleException(ResourceNotFoundException ex) {
        return ApiResponse.exception(ex.getHttpStatus(), ex.getMessage());
    }

    @ExceptionHandler(IllegalPasswordException.class)
    public ApiResponse<String> handleException(IllegalPasswordException ex) {
        return ApiResponse.exception(ex.getHttpStatus(), ex.getMessage());
    }

    @ExceptionHandler(IllegalJwtTokenException.class)
    public ApiResponse<String> handleException(IllegalJwtTokenException ex) {
        return ApiResponse.exception(ex.getHttpStatus(), ex.getMessage());
    }

    @ExceptionHandler(JwtException.class)
    public ApiResponse<JwtExceptionResponse> handleException(JwtException ex) {
        JwtExceptionType jwtExceptionType = JwtExceptionType.from(ex);
        return ApiResponse.exception(jwtExceptionType.getHttpStatus(), new JwtExceptionResponse(jwtExceptionType));
    }

    @ExceptionHandler(MemberDuplicationException.class)
    public ApiResponse<String> handleException(MemberDuplicationException ex) {
        return ApiResponse.exception(ex.getHttpStatus(), ex.getMessage());
    }

}
