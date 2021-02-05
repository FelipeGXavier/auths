package com.key.demo.api;


import com.key.demo.data.InMemoryDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/src")
public class GeneralController {

    @Autowired
    private InMemoryDatabase database;

    @GetMapping("/{hash}")
    public String get(@PathVariable("hash") String hash) {
        return this.database.get(hash);
    }

    @PostMapping("/keys")
    public ResponseEntity<?> add(@RequestBody AddKeyRequest request) {
        this.database.add(request.getKey(), request.getValue());
        return ResponseEntity.ok().build();
    }

}
