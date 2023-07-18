package com.todo.app.common.aop.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todo.app.common.ApiResponse;
import com.todo.app.common.exception.JwtExceptionType;
import com.todo.app.domain.jwt.entity.JwtProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.MalformedJwtException;
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.util.PatternMatchUtils;

public class JwtAuthorizationFilter implements Filter {

    private final String[] whiteListUris = new String[]{"/api/login", "/api/auth/refresh-access-token"}; // TODO: 회원가입 등 인가에서 제외할 URI 등록하기
    private final JwtProvider jwtProvider = new JwtProvider();
    private final ObjectMapper objectMapper;

    public JwtAuthorizationFilter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        HttpServletRequest httpServletRequest = (HttpServletRequest) request;

        if(whiteListCheck(httpServletRequest.getRequestURI())){
            chain.doFilter(request, response);
            return;
        }

        if(!isContainToken(httpServletRequest)){
            sendErrorApiResponse(response, new MalformedJwtException(""));
            return;
        }

        ((HttpServletResponse) response).setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");

        try {
            String token = getToken(httpServletRequest);
            Claims claims = jwtProvider.getClaims(token);
            request.setAttribute("memberId", claims.get("memberId")); // TODO: 닉네임을 사용한다면 nickname을 추가로 보내 주거나 멤버 response 객체를 하나 만들면 좋을 듯
            chain.doFilter(request, response);
        } catch (RuntimeException e) {
            sendErrorApiResponse(response, e);
        }
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

    private void sendErrorApiResponse(ServletResponse response, RuntimeException e) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        ((HttpServletResponse) response).setStatus(HttpStatus.UNAUTHORIZED.value());

        response.getWriter().write(
                objectMapper.writeValueAsString(
                        generateErrorApiResponse(e))
        );
    }

    private ApiResponse<String> generateErrorApiResponse(RuntimeException e) {
        JwtExceptionType jwtExceptionType = JwtExceptionType.from(e);
        return ApiResponse.exception(
                jwtExceptionType.getHttpStatus(),
                jwtExceptionType.getMessage());
    }

}
