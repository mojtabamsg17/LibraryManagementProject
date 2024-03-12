package com.example.librarymanagement.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LoginConfig {
    private final LoginFilter filterlogin;
    public LoginConfig(LoginFilter filterAdmin) {
        this.filterlogin = filterAdmin;
    }

    @Bean
    public FilterRegistrationBean<LoginFilter> FilterRegistrationBean() {
        FilterRegistrationBean<LoginFilter> registrationBean
                = new FilterRegistrationBean<>();
        registrationBean.setFilter(filterlogin);
        registrationBean.addUrlPatterns("/customer/*");
        registrationBean.addUrlPatterns("/admin/*");
        registrationBean.setName("filterAdmin");

        return registrationBean;
    }
}
