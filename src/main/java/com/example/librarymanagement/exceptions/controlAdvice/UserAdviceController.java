package com.example.librarymanagement.exceptions.controlAdvice;


import com.example.librarymanagement.exceptions.*;
import com.example.librarymanagement.services.GeneralBooksCountLimitationException;
import com.example.librarymanagement.services.SpecialBooksCountLimitationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class UserAdviceController {
    @ExceptionHandler(RepeatRoleException.class)
    public ResponseEntity<Object> handleRepeatRoleException(RepeatRoleException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "RepeatRoleException");
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(BannedAccountException.class)
    public ResponseEntity<Object> handleBannedAccountException(BannedAccountException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "BannedAccountException");
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(NotEnoughWalletException.class)
    public ResponseEntity<Object> handleNotEnoughWalletException(NotEnoughWalletException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "NotEnoughWalletException");
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(BookBalanceException.class)
    public ResponseEntity<Object> handleBookBalanceException(BookBalanceException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "BookBalanceException");
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(NotAllowedToBorrowRareBookException.class)
    public ResponseEntity<Object> handleNotAllowedToBorrowRareBookException(NotAllowedToBorrowRareBookException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "NotAllowedToBorrowRareBookException");
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(GeneralBooksCountLimitationException.class)
    public ResponseEntity<Object> handleGeneralBooksCountLimitationException(GeneralBooksCountLimitationException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "GeneralBooksCountLimitationException");
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(SpecialBooksCountLimitationException.class)
    public ResponseEntity<Object> handleSpecialBooksCountLimitationException(SpecialBooksCountLimitationException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "SpecialBooksCountLimitationException");
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(BookCountLimitationException.class)
    public ResponseEntity<Object> handleBookCountLimitationException(BookCountLimitationException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "BookCountLimitationException");
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity<Object> handleNotFoundException(BookNotFoundException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "NotFoundException");
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(BookIsNotBorrowedToThisUserException.class)
    public ResponseEntity<Object> handleBookIsNotBorrowedToThisUserException(BookIsNotBorrowedToThisUserException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "BookIsNotBorrowedToThisUserException");
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(AccountBannedException.class)
    public ResponseEntity<Object> handleAccountBannedException(AccountBannedException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "AccountBannedException");
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(RepeatBookException.class)
    public ResponseEntity<Object> handleRepeatBookException(RepeatBookException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "RepeatBookException");
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Object> handleUserNotFoundException(EntityNotFoundException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "NotFoundException");
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(CantChangeYourRoleException.class)
    public ResponseEntity<Object> handleCantChangeYourRoleException(CantChangeYourRoleException e) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "CantChangeYourRoleException");
        return ResponseEntity.ok(response);
    }
    @ExceptionHandler(DateOfMemberTypeIsOver.class)
    public ResponseEntity<Object> handleDateOfMemberTypeIsOver(DateOfMemberTypeIsOver e) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "DateOfMemberTypeIsOver");
        return ResponseEntity.ok(response);
    }
}
