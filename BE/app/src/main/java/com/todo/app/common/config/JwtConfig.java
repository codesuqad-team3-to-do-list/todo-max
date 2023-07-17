package com.todo.app.common.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todo.app.common.aop.jwt.JwtAuthorizationFilter;
import javax.servlet.Filter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {

    @Bean
    public FilterRegistrationBean jwtAuthorizationFilter(ObjectMapper mapper) {

        FilterRegistrationBean<Filter> filterRegistrationBean = new
                FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new JwtAuthorizationFilter(mapper));
        filterRegistrationBean.setOrder(1);
        return filterRegistrationBean;
    }

}
