package com.todo.app.domain.column.controller;

import com.todo.app.common.ApiResponse;
import com.todo.app.domain.column.controller.request.ActionRequestType;
import com.todo.app.domain.column.controller.request.CardCreateRequest;
import com.todo.app.domain.column.controller.request.CardUpdateRequest;
import com.todo.app.domain.column.controller.response.CardResponse;
import com.todo.app.domain.column.service.CardService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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

    @PatchMapping("/api/columns/{columnId}/cards/{cardId}")
    public ApiResponse<CardResponse> updateCard(@RequestBody CardUpdateRequest updateRequest, @PathVariable Long columnId, @PathVariable Long cardId, @RequestParam String action) {
        if(!ActionRequestType.isUpdate(action)) {
            throw new IllegalArgumentException(action + "은 올바른 입력값이 아닙니다.");
        }

        return ApiResponse.success(
                HttpStatus.OK,
                CardResponse.from(cardService.update(updateRequest.toCardUpdate(), columnId))
        );
    }

}
