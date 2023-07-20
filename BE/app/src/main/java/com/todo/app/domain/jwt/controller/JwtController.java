package com.todo.app.domain.jwt.controller;

import com.todo.app.common.ApiResponse;
import com.todo.app.domain.jwt.controller.request.JwtRefreshTokenRequest;
import com.todo.app.domain.jwt.controller.request.LoginRequest;
import com.todo.app.domain.jwt.controller.request.SignInRequest;
import com.todo.app.domain.jwt.controller.response.JwtResponse;
import com.todo.app.domain.jwt.service.JwtService;
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
    public ApiResponse<JwtResponse> login(@RequestBody LoginRequest request) {
        return ApiResponse.success(
                HttpStatus.OK,
                JwtResponse.from(jwtService.login(request.getEmail(), request.getPassword()))
        );
    }

    @PostMapping("/api/signup")
    public ApiResponse<Void> signup(@RequestBody SignInRequest request) {
        jwtService.signup(request.getEmail(), request.getPassword());
        return ApiResponse.success(HttpStatus.CREATED);
    }

    @PostMapping("/api/auth/reissue-access-token")
    public ApiResponse<JwtResponse> reissueAccessToken(@RequestBody JwtRefreshTokenRequest request) {
        return ApiResponse.success(
                HttpStatus.OK,
                JwtResponse.from(jwtService.reissueAccessToken(request.getRefreshToken()))
        );
    }

}
