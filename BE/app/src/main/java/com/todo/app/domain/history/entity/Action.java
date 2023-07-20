package com.todo.app.domain.history.entity;

import java.util.Arrays;

public enum Action {

    CREATE,
    MOVE,
    MODIFY,
    DELETE;

    public static Action from(String input) {
        return Arrays.stream(Action.values())
                .filter(action -> action.name().equals(input))
                .findAny()
                .get(); // TODO: 예외 처리 필요
    }
}
