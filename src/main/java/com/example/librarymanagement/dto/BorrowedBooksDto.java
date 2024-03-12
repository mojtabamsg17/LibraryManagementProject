package com.example.librarymanagement.dto;

import java.time.LocalDate;

public class BorrowedBooksDto {
    private Long bookId;

    private Long userId;

    private String title;

    private String bookType;

    private LocalDate reservationDate;

    private LocalDate returnDate;

    private String username;


    public BorrowedBooksDto(Long bookId, String title, String bookType, LocalDate reservationDate, LocalDate returnDate, String username,Long userId) {
        this.title = title;
        this.bookId = bookId;
        this.userId = userId;
        this.bookType = bookType;
        this.reservationDate = reservationDate;
        this.returnDate = returnDate;
        this.username = username;
    }

    public BorrowedBooksDto() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBookType() {
        return bookType;
    }

    public void setBookType(String bookType) {
        this.bookType = bookType;
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
