package com.example.librarymanagement.dto;

public class UserDto {

    private Long id;
    private String name;
    private String roleName;

    public String getRoleName() {
        return roleName;
    }

    public UserDto setRoleName(String roleName) {
        this.roleName = roleName;
        return this;
    }

    public Long getId() {
        return id;
    }

    public UserDto setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public UserDto setName(String name) {
        this.name = name;
        return this;
    }
}