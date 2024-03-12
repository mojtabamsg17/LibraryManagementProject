package com.example.librarymanagement.exceptions.login;

public class InvalidUsername extends Exception{
    public InvalidUsername(String message) {
        super(message);
    }

    public InvalidUsername() {
    }
}
