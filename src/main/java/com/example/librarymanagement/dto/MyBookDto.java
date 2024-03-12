package com.example.librarymanagement.dto;

import java.time.LocalDate;

public class MyBookDto {
    private Long Id;

    private String title;

    private String bookType;

    private LocalDate reservationDate;

    private LocalDate returnDate;

    public MyBookDto(Long id, String title, String bookType, LocalDate reservationDate, LocalDate returnDate) {
        Id = id;
        this.title = title;
        this.bookType = bookType;
        this.reservationDate = reservationDate;
        this.returnDate = returnDate;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
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
}
