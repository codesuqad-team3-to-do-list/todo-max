package com.todo.app.common;

import org.springframework.http.HttpStatus;

public class ApiResponse<T> {

    private int statusCode;
    private T message;

    public ApiResponse(HttpStatus status, T message) {
        this.statusCode = status.value();
        this.message = message;
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
}
