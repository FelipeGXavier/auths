package com.jwt.demo.api;

import com.jwt.demo.configuration.UserPrincipal;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PingController {

    @GetMapping("/ping")
    public String ping() {
        return "Pong";
    }

    @GetMapping("guard")
    public String guard() {
        UserPrincipal userPrincipal =
                (UserPrincipal)
                        SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userPrincipal.toString();
    }

    @GetMapping("admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String admin() {
        return "Admin Route";
    }
}
