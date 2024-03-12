package com.example.librarymanagement.config;


import com.example.librarymanagement.entities.User;
import jakarta.servlet.*;
import jakarta.servlet.Filter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class LoginFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) {

    }
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        System.out.println("#####ZZZZZZZXXXXXXXXXXX"+request.getRequestURI()+"#####ZZZZZZZXXXXXXXXXXX");
        String targetURL = request.getRequestURI().split("/")[1];
        try {
        if (((User) request.getSession().getAttribute("user")).getRole().getRoleName().equals(targetURL)) {
            System.out.println("#####ZZZZZZZXXXXXXXXXXX"+((User) request.getSession().getAttribute("user")).getUsername());
            filterChain.doFilter(servletRequest, servletResponse);
        }
        }catch (Exception e){
            System.out.println(e.getMessage());
            response.sendRedirect("http://localhost:9090/login.html");
        }
    }
  @Override
    public void destroy() {

    }
}
