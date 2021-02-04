package com.jwt.demo.services;

import com.jwt.demo.configuration.UserPrincipal;
import com.jwt.demo.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class TokenService {

    @Value("${jwt.secret}")
    private String secret;

    public String generateToken(User user) {
        Instant expirationTime = Instant.now().plus(1, ChronoUnit.HOURS);
        Date expirationDate = Date.from(expirationTime);
        Key key = Keys.hmacShaKeyFor(this.secret.getBytes());
        String compactTokenString =
                Jwts.builder()
                        .claim("id", user.getId())
                        .claim("sub", user.getEmail())
                        .setExpiration(expirationDate)
                        .signWith(key, SignatureAlgorithm.HS256)
                        .compact();
        return compactTokenString;
    }

    public UserPrincipal parseToken(String token) {
        byte[] secretBytes = this.secret.getBytes();
        Jws<Claims> jwsClaims =
                Jwts.parserBuilder().setSigningKey(secretBytes).build().parseClaimsJws(token);
        String username = jwsClaims.getBody().getSubject();
        Long userId = jwsClaims.getBody().get("id", Long.class);
        return new UserPrincipal(username, userId);
    }
}
