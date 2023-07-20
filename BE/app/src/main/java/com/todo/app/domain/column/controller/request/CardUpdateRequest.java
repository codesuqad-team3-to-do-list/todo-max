package com.todo.app.domain.column.controller.request;


import com.todo.app.domain.column.domain.Card;
import com.todo.app.domain.history.entity.Action;
import com.todo.app.domain.history.entity.History;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class CardUpdateRequest {

    private Long id;

    @Size(max = 30, message = "제목은 30자 이하로 작성해 주세요.")
    @NotBlank
    private String title;

    @Size(max = 500, message = "내용은 500자 이하로 작성해 주세요.")
    @NotBlank
    private String content;

    public CardUpdateRequest() {}

    public CardUpdateRequest(Long id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }


    public Card toCardUpdate() {
        return Card.updateCard(id, title, content);
    }


    public History toHistory(Long memberId) {
        return new History(memberId, Action.MODIFY.name(), title);
    }
}
