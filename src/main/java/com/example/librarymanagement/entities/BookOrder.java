package com.example.librarymanagement.entities;


import com.example.librarymanagement.entities.entity.EntityInterface;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "bookorder_finallibrary")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class BookOrder implements EntityInterface {
    @Id
    @SequenceGenerator(name = "finalLibraryBookOrder_sequence", sequenceName = "finalLibraryBookOrderSequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "finalLibraryBookOrder_sequence")
    private Long id;

    private Date OrderDate;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book mBook;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User mUser;

    public BookOrder(Date orderDate, Book book, User user) {
        OrderDate = orderDate;
        mBook = book;
        mUser = user;
    }

    public BookOrder() {
    }


    @Override
    public Long getId() {
        return id;
    }

    public Date getOrderDate() {
        return OrderDate;
    }

    public void setOrderDate(Date orderDate) {
        OrderDate = orderDate;
    }

    public Book getBook() {
        return mBook;
    }

    public void setBook(Book book) {
        mBook = book;
    }

    public User getUser() {
        return mUser;
    }

    public void setUser(User user) {
        mUser = user;
    }
}
