package com.example.librarymanagement.exceptions.controlAdvice;
public class ApiRequestException extends Throwable{
    public ApiRequestException(String message) {
        super(message);
    }
    public ApiRequestException(String message, Throwable cause) {
        super(message, cause);
    }
}