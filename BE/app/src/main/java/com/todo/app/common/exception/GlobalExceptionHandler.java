package com.todo.app.common.exception;

import com.todo.app.common.ApiResponse;
import com.todo.app.domain.jwt.controller.response.JwtExceptionResponse;
import io.jsonwebtoken.JwtException;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ApiResponse<String> handleException(Exception ex, HttpServletResponse response) {
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        return ApiResponse.exception(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ApiResponse<String> handleException(IllegalArgumentException ex, HttpServletResponse response) {
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        return ApiResponse.exception(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ApiResponse<String> handleException(ResourceNotFoundException ex, HttpServletResponse response) {
        response.setStatus(ex.getHttpStatus().value());
        return ApiResponse.exception(ex.getHttpStatus(), ex.getMessage());
    }

    @ExceptionHandler(IllegalPasswordException.class)
    public ApiResponse<String> handleException(IllegalPasswordException ex, HttpServletResponse response) {
        response.setStatus(ex.getHttpStatus().value());
        return ApiResponse.exception(ex.getHttpStatus(), ex.getMessage());
    }

    @ExceptionHandler(IllegalJwtTokenException.class)
    public ApiResponse<String> handleException(IllegalJwtTokenException ex, HttpServletResponse response) {
        response.setStatus(ex.getHttpStatus().value());
        return ApiResponse.exception(ex.getHttpStatus(), ex.getMessage());
    }

    @ExceptionHandler(JwtException.class)
    public ApiResponse<JwtExceptionResponse> handleException(JwtException ex, HttpServletResponse response) {
        JwtExceptionType jwtExceptionType = JwtExceptionType.from(ex);
        response.setStatus(jwtExceptionType.getHttpStatus().value());
        return ApiResponse.exception(jwtExceptionType.getHttpStatus(), new JwtExceptionResponse(jwtExceptionType));
    }

    @ExceptionHandler(MemberDuplicationException.class)
    public ApiResponse<String> handleException(MemberDuplicationException ex, HttpServletResponse response) {
        response.setStatus(ex.getHttpStatus().value());
        return ApiResponse.exception(ex.getHttpStatus(), ex.getMessage());
    }

}
