package com.todo.app.common.exception;

import com.todo.app.common.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ApiResponse<String> handleException(Exception ex) {
        return ApiResponse.exception(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ApiResponse<String> handleException(ResourceNotFoundException ex) {
        return ApiResponse.exception(ex.getHttpStatus(), ex.getMessage());
    }
}
