package com.example.librarymanagement.entities;


import com.example.librarymanagement.entities.entity.EntityInterface;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "bookloan_finallibrary")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class BookLoan implements EntityInterface {
    @jakarta.persistence.Id
    @SequenceGenerator(name = "finalLibraryBookLoan_sequence", sequenceName = "bookLoanSequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "finalLibraryBookLoan_sequence")
    private Long Id;

    private LocalDate reservationDate;

    private LocalDate returnDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User mUser;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book mBook;




    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
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

    public User getUser() {
        return mUser;
    }

    public void setUser(User user) {
        mUser = user;
    }

    public Book getBook() {
        return mBook;
    }

    public void setBook(Book book) {
        mBook = book;
    }


}
