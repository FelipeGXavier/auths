package com.key.demo.filters;

import com.key.demo.data.InMemoryDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

public class ApiKeyAuthManager implements AuthenticationManager {

    private InMemoryDatabase database;

    public ApiKeyAuthManager(InMemoryDatabase database) {
        this.database = database;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        var apiKey = (String) authentication.getPrincipal();

        if (!this.database.has(apiKey)) {
            throw new BadCredentialsException("API Key not found");
        } else {
            authentication.setAuthenticated(true);
            return authentication;
        }
    }
}
