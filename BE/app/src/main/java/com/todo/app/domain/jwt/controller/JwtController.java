package com.todo.app.domain.jwt.controller;

import com.todo.app.common.ApiResponse;
import com.todo.app.domain.jwt.controller.request.LoginRequest;
import com.todo.app.domain.jwt.controller.response.JwtResponse;
import com.todo.app.domain.jwt.service.JwtService;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JwtController {

    private final JwtService jwtService;

    public JwtController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/api/login")
    public ApiResponse<JwtResponse> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        return ApiResponse.success(
                HttpStatus.OK,
                JwtResponse.from(jwtService.login(request.getEmail(), request.getPassword()))
        );
    }
}
