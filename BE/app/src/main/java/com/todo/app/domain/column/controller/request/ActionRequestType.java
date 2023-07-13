package com.todo.app.domain.column.controller.request;

public enum ActionRequestType {
    UPDATE, MOVE_COLUMN;

    public static boolean isUpdate(String action) {
        return action.toUpperCase().equals(ActionRequestType.UPDATE.name());
    }

}
