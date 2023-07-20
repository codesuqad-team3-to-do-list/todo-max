package com.todo.app.common.exception;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends CustomBusinessException {

    private static final HttpStatus httpStatus = HttpStatus.NOT_FOUND;

    public ResourceNotFoundException(String datasource, long id) {
        super(httpStatus, datasource + "에서 ID " + id + "를 찾을 수 없습니다.");
    }

    @Override
    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
