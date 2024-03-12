package com.example.librarymanagement.exceptions.login;

public class AccessError extends Throwable{
    public AccessError(String message) {
        super(message);
    }

    public AccessError() {
    }
}
