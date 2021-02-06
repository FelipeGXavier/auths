package com.key.demo.api;


import com.key.demo.data.InMemoryDatabase;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/datasource")
public class GeneralController {

    @Autowired
    private InMemoryDatabase database;

    @GetMapping("/{hash}")
    @ApiOperation(value = "Retorna o valor a partir da chave")
    public String get(@PathVariable("hash") String hash) {
        return this.database.get(hash);
    }

    @PostMapping("/keys")
    @ApiOperation(value = "Insere um elemento como chave e um valor definido no banco de dados em memória")
    public ResponseEntity<?> add(@RequestBody AddKeyRequest request) {
        this.database.add(request.getKey(), request.getValue());
        return ResponseEntity.ok().build();
    }

}
