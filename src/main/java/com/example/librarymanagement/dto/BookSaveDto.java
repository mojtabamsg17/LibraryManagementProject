package com.example.librarymanagement.dto;

public class BookSaveDto {

    private String title;
    private String author;
    private Integer totalBookCount;

    private String typeName;

    public BookSaveDto(String title, String author, Integer totalBookCount, String typeName) {

        this.title = title;
        this.author = author;
        this.totalBookCount = totalBookCount;
        this.typeName = typeName;
    }

    public Integer getTotalBookCount() {
        return totalBookCount;
    }

    public void setTotalBookCount(Integer totalBookCount) {
        this.totalBookCount = totalBookCount;
    }



    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
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


    }
