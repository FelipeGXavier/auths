package com.jwt.demo.data;

public class CreateUserRequest {

    private String email;
    private String password;
    private String name;
    private String username;

    public CreateUserRequest(String email, String password, String name, String username) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public String getUsername() {
        return username;
    }
}
