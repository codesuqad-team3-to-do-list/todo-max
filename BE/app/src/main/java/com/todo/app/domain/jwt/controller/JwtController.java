package com.todo.app.domain.jwt.controller;

import com.todo.app.common.ApiResponse;
import com.todo.app.domain.jwt.controller.request.JwtRefreshTokenRequest;
import com.todo.app.domain.jwt.controller.request.LoginRequest;
import com.todo.app.domain.jwt.controller.request.SignInRequest;
import com.todo.app.domain.jwt.controller.response.JwtResponse;
import com.todo.app.domain.jwt.service.JwtService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
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

    @PostMapping("/api/signin")
    public ApiResponse<Void> signIn(@RequestBody SignInRequest request) {
        jwtService.signIn(request.getEmail(), request.getPassword());
        return ApiResponse.success(HttpStatus.OK);
    }

    @PostMapping("/api/auth/refresh-access-token")
    public ApiResponse<JwtResponse> refresh(@RequestBody JwtRefreshTokenRequest request) {
        return ApiResponse.success(
                HttpStatus.OK,
                JwtResponse.from(jwtService.renewAccessToken(request.getRefreshToken()))
        );
    }

    @GetMapping("/api/test")
    public ApiResponse<String> test(HttpServletRequest request) {
        return ApiResponse.success(HttpStatus.OK, "Success");
    }
}
