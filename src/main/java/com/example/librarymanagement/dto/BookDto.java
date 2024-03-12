package com.example.librarymanagement.dto;

public class BookDto {
    private Long id;
    private String title;
    private String author;
    private String balance;
    private Integer totalBookCount;


    private String typeName;

    public BookDto() {
    }

    public BookDto(Long id, String title, String author, String balance, Integer totalBookCount, String typeName) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.balance = balance;
        this.totalBookCount = totalBookCount;
        this.typeName = typeName;
    }

    public Integer getTotalBookCount() {
        return totalBookCount;
    }

    public void setTotalBookCount(Integer totalBookCount) {
        this.totalBookCount = totalBookCount;
    }



    public void setBalance(String balance) {
        this.balance = balance;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getBalance() {
        return balance;
    }
}
