package com.todo.app.domain.column.controller;

import com.todo.app.common.ApiResponse;
import com.todo.app.domain.column.controller.request.CardCreateRequest;
import com.todo.app.domain.column.controller.request.CardMoveRequest;
import com.todo.app.domain.column.controller.request.CardUpdateRequest;
import com.todo.app.domain.column.controller.response.CardResponse;
import com.todo.app.domain.column.service.CardService;
import com.todo.app.domain.history.service.HistoryService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CardController {

    private final CardService cardService;
    private final HistoryService historyService;

    public CardController(CardService cardService, HistoryService historyService) {
        this.cardService = cardService;
        this.historyService = historyService;
    }

    @PostMapping("/api/columns/{columnId}/cards")
    public ApiResponse<CardResponse> createCard(@RequestBody CardCreateRequest createRequest, @PathVariable Long columnId) {
        return ApiResponse.success(
                HttpStatus.OK,
                CardResponse.from(cardService.create(createRequest.toCardCreate(columnId)))
        );
    }

    @PatchMapping("/api/cards/{cardId}")
    public ApiResponse<Void> updateCard(@PathVariable Long cardId, @RequestBody CardUpdateRequest updateRequest) {
        cardService.update(updateRequest.toCardUpdate());

        return ApiResponse.success(HttpStatus.OK);
    }

    @PatchMapping("/api/columns/{columnId}/cards/{cardId}")
    public ApiResponse<Void> moveCard(@PathVariable Long columnId, @PathVariable Long cardId, @RequestBody CardMoveRequest request) {
        cardService.move(request.toCard(), request.getPreviousCardId(), request.getNextCardId());

        if (request.isMovedColumn(columnId)) {
            historyService.cache(request.toHistory(1L));
        }

        return ApiResponse.success(HttpStatus.OK);
    }

    @DeleteMapping("/api/columns/{columnId}/cards/{cardId}")
    public ApiResponse<String> deleteCard(@PathVariable Long columnId, @PathVariable Long cardId) {
        cardService.delete(cardId);

        return ApiResponse.success(
                HttpStatus.OK,
                HttpStatus.OK.getReasonPhrase()
        );
    }
}
