package com.todo.app.common.aop.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todo.app.common.exception.IllegalJwtTokenException;
import com.todo.app.domain.jwt.entity.JwtProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.util.PatternMatchUtils;

public class JwtAuthorizationFilter implements Filter {

    private final String[] whiteListUris = new String[]{"/api/login"}; // TODO: 회원가입 등 인가에서 제외할 URI 등록하기
    private final JwtProvider jwtProvider = new JwtProvider();
    private final ObjectMapper objectMapper;

    public JwtAuthorizationFilter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;

        if(whiteListCheck(httpServletRequest.getRequestURI())){
            chain.doFilter(request, response);
            return;
        }

        if(!isContainToken(httpServletRequest)){
            httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(),"토큰 인증 오류");
            return;
        }

        try {
            String token = getToken(httpServletRequest);
            Claims claims = jwtProvider.getClaims(token);
            request.setAttribute("memberId", claims.get("memberId"));
            chain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
            throw new IllegalJwtTokenException("기한이 만료되었습니다.");
        } catch (MalformedJwtException e) {
            throw new IllegalJwtTokenException("잘못된 형식의 토큰입니다.");
        } catch (SignatureException e) {
            throw new IllegalJwtTokenException("잘못된 키입니다.");
        } catch (IllegalArgumentException e) {
            throw new IllegalJwtTokenException("잘못된 값이 들어왔습니다.");
        } // TODO: 예외를 ApiResponse에 담아서 반환하도록 처리해야 합니다.
    }

    private boolean whiteListCheck(String uri){
        return PatternMatchUtils.simpleMatch(whiteListUris, uri);
    }

    private boolean isContainToken(HttpServletRequest request){
        String authorization = request.getHeader("Authorization");
        return authorization != null && authorization.startsWith("Bearer ");
    }

    private String getToken(HttpServletRequest request){
        String authorization = request.getHeader("Authorization");
        return authorization.substring(7);
    }

}
