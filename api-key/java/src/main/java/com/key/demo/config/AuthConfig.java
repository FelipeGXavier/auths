package com.key.demo.config;

import com.key.demo.data.InMemoryDatabase;
import com.key.demo.filters.ApiKeyAuthManager;
import com.key.demo.filters.ApiKeyFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@EnableWebSecurity
@Configuration
public class AuthConfig extends WebSecurityConfigurerAdapter {

    @Autowired private InMemoryDatabase inMemoryDatabase;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        ApiKeyFilter apiKeyFilter = new ApiKeyFilter();
        apiKeyFilter.setAuthenticationManager(new ApiKeyAuthManager(inMemoryDatabase));
        http.authorizeRequests()
                .antMatchers(
                        "/v2/api-docs",
                        "/api/datasource/*",
                        "/configuration/ui",
                        "/swagger-resources/**",
                        "/configuration/security",
                        "/swagger-ui.html",
                        "/webjars/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .csrf()
                .disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(apiKeyFilter);
    }
}
