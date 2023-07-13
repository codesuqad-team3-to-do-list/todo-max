package com.todo.app.domain.column.controller;

import com.todo.app.common.ApiResponse;
import com.todo.app.domain.column.controller.request.CardCreateRequest;
import com.todo.app.domain.column.controller.response.CardResponse;
import com.todo.app.domain.column.service.CardService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping("/api/columns/{columnId}/cards")
    public ApiResponse<CardResponse> createCard(@RequestBody CardCreateRequest createRequest, @PathVariable Long columnId) {
        return ApiResponse.success(
                HttpStatus.OK,
                CardResponse.from(cardService.create(createRequest.toCardCreate(columnId)))
        );
    }

}
