package com.jwt.demo.api;

import com.jwt.demo.data.CreateUserRequest;
import com.jwt.demo.data.LoginRequest;
import com.jwt.demo.entity.User;
import com.jwt.demo.repository.UserRepository;
import com.jwt.demo.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired private UserRepository userRepository;
    @Autowired private TokenService tokenService;

    @PostMapping("/register")
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> create(
            @RequestBody CreateUserRequest request, BCryptPasswordEncoder bCryptPasswordEncoder) {
        var user =
                new User(
                        bCryptPasswordEncoder.encode(request.getPassword()),
                        request.getUsername(),
                        request.getName(),
                        request.getEmail());
        this.userRepository.save(user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, BCryptPasswordEncoder bCryptPasswordEncoder) {
        var user = this.userRepository.findByEmail(request.getEmail());
        if (user.isPresent()) {
            if(bCryptPasswordEncoder.matches(request.getPassword(), user.get().getPassword())){
                var token = this.tokenService.generateToken(user.get());
                return new ResponseEntity<>(token, HttpStatus.OK);
            }else {
                return ResponseEntity.status(401).build();
            }
        }
        return ResponseEntity.badRequest().build();
    }
}
