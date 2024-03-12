package com.example.librarymanagement.entities;


import com.example.librarymanagement.entities.entity.EntityInterface;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.List;
import java.util.Objects;

@Entity
@DynamicInsert
@DynamicUpdate
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@Table(name = "book_finallibrary")
public class Book implements EntityInterface {
    @jakarta.persistence.Id
    @SequenceGenerator(name = "finalLibraryBook_sequence", sequenceName = "bookSequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "finalLibraryBook_sequence")
    private Long Id;
    private String title;
    private String author;

    @ManyToOne
    @JoinColumn(name = "booktype_id")
    private BookType mBookType;

    @OneToMany(mappedBy = "mBook", fetch = FetchType.LAZY)
    private List<BookOrder> mBookOrders;

    @OneToMany(mappedBy = "mBook", fetch = FetchType.LAZY)
    private List<BookLoan> mBookLoans;

    private Integer totalBookCount;
    private Integer balance;

    public Integer getTotalBookCount() {
        return totalBookCount;
    }

    public void setTotalBookCount(Integer totalBookCount) {
        this.totalBookCount = totalBookCount;
    }

    public Book() {
    }

    public Book(String title, String author, Integer totalBookCount) {
        this.title = title;
        this.author = author;
        this.totalBookCount = totalBookCount;
    }

    public Integer getBalance() {
        return balance;
    }

    public void setBalance(Integer balance) {
        this.balance = balance;
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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public BookType getBookType() {
        return mBookType;
    }

    public void setBookType(BookType bookType) {
        mBookType = bookType;
    }

    public List<BookLoan> getBookLoans() {
        return mBookLoans;
    }

    public void setBookLoans(List<BookLoan> bookLoans) {
        mBookLoans = bookLoans;
    }

    public List<BookOrder> getBookOrders() {
        return mBookOrders;
    }

    public void setBookOrders(List<BookOrder> bookOrders) {
        mBookOrders = bookOrders;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Book book = (Book) o;
        return Objects.equals(Id, book.Id) && Objects.equals(title, book.title) && Objects.equals(author, book.author) && Objects.equals(mBookType, book.mBookType) && Objects.equals(mBookOrders, book.mBookOrders) && Objects.equals(mBookLoans, book.mBookLoans) && Objects.equals(balance, book.balance);
    }

    @Override
    public int hashCode() {
        return Objects.hash(Id, title, author, mBookType, mBookOrders, mBookLoans, balance);
    }


}
