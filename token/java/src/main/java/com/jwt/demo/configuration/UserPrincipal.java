package com.jwt.demo.configuration;


public class UserPrincipal {

   private String username;
   private Long id;

    public UserPrincipal(String username, Long id) {
        this.username = username;
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public Long getId() {
        return id;
    }

    @Override
    public String toString() {
        return "UserPrincipal{" +
                "username='" + username + '\'' +
                ", id=" + id +
                '}';
    }
}
