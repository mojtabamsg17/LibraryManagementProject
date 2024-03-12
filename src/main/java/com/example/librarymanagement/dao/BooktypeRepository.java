package com.example.librarymanagement.dao;


import com.example.librarymanagement.entities.BookType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

@Repository
public class BooktypeRepository {
    private final EntityManager mManager;

    public BooktypeRepository(EntityManager manager) {
        mManager = manager;
    }


    public BookType findBookTypeByName(String typeName) {
        Query query = mManager.createQuery("select o from BookType o where o.typeName =: typeName");
        query.setParameter("typeName", typeName);
        BookType bookType = (BookType) query.getSingleResult();
        return bookType;
    }
}
