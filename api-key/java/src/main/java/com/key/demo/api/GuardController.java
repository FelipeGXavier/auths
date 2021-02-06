package com.key.demo.api;

import com.key.demo.data.InMemoryDatabase;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/guard")
public class GuardController {

    @Autowired private InMemoryDatabase database;

    @GetMapping
    @ApiOperation(value = "Retorna o valor a partir da API Key enviada pelo header")
    @ApiImplicitParam(
            name = "x-api-key",
            value = "Access Token",
            required = true,
            paramType = "header",
            dataTypeClass = String.class,
            example = "token")
    private ResponseEntity<?> guard() {
        var key = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(this.database.get(key));
    }
}
