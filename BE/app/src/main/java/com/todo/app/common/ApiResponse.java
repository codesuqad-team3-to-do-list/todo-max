package com.todo.app.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import org.springframework.http.HttpStatus;

public class ApiResponse<T> {

    private int statusCode;

    @JsonInclude(Include.NON_NULL)
    private T message;

    public ApiResponse(HttpStatus status, T message) {
        this.statusCode = status.value();
        this.message = message;
    }

    public ApiResponse(int statusCode) {
        this.statusCode = statusCode;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public T getMessage() {
        return message;
    }

    public static <T> ApiResponse<T> success(HttpStatus status, T message) {
        return new ApiResponse<>(status, message);
    }

    public static <String> ApiResponse<String> exception(HttpStatus status, String message) {
        return new ApiResponse<>(status, message);
    }

    public static ApiResponse<Void> success(HttpStatus status) {
        return new ApiResponse<>(status.value());
    }
}
