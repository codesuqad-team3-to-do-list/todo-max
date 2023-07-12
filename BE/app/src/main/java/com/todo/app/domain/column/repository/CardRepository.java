package com.todo.app.domain.column.repository;

import com.todo.app.domain.column.entity.Card;
import java.util.List;

public interface CardRepository {

    List<Card> findAllBy(Long memberId);
}