package com.example.librarymanagement.exceptions.login;

import jakarta.persistence.PersistenceException;

public class NotLogin extends PersistenceException {
    public NotLogin() {
    }

    public NotLogin(String message) {
        super(message);
    }
}
