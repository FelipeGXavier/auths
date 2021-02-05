package com.key.demo.data;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@Scope("singleton")
public class InMemoryDatabase {

    private Map<String, String> datasource;

    public InMemoryDatabase() {
        this.datasource = new HashMap<>();
    }

    public boolean has(String key) {
        return !(this.datasource.get(key) == null);
    }

    public String get(String key) {
        return this.datasource.get(key);
    }

    public void add(String key, String val) {
        this.datasource.putIfAbsent(key, val);
    }
}
