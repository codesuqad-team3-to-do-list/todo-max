package com.todo.app.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import org.springframework.http.HttpStatus;

public class ApiResponse<T> {

    private int statusCode;

    @JsonInclude(Include.NON_NULL)
    private T data;

    public ApiResponse(HttpStatus status, T data) {
        this.statusCode = status.value();
        this.data = data;
    }

    public ApiResponse(int statusCode) {
        this.statusCode = statusCode;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public T getData() {
        return data;
    }

    public static <T> ApiResponse<T> success(HttpStatus status, T data) {
        return new ApiResponse<>(status, data);
    }

    public static <String> ApiResponse<String> exception(HttpStatus status, String data) {
        return new ApiResponse<>(status, data);
    }

    public static ApiResponse<Void> success(HttpStatus status) {
        return new ApiResponse<>(status.value());
    }
}
