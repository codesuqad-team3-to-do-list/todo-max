package com.todo.app.domain.jwt.entity;

public class Member {

    private final Long id;
    private final String email;
    private final String password;
    private final String createDateTime;


    public Member(Long id, String email, String password, String createDateTime) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.createDateTime = createDateTime;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getCreateDateTime() {
        return createDateTime;
    }
}
