package com.example.librarymanagement.dao;


import com.example.librarymanagement.entities.Book;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookRepository {
    private final EntityManager mManager;

    public BookRepository(EntityManager manager) {
        mManager = manager;
    }


    public List<Book> findBookByBookType(String typeName, Integer page, Integer limit) {
//        Query query = mManager.createQuery("SELECT b FROM Book b JOIN BookType bt ON b.mBookType.id = bt.id WHERE bt.typeName  =: typeName");
        Query query = mManager.createQuery("SELECT b FROM Book b where b.mBookType.typeName  =: typeName");
        query.setParameter("typeName", typeName);
        query.setFirstResult(((page) * limit));
        query.setMaxResults(limit);
        List<Book> books =  query.getResultList();
        return books;
    }

    public Long findBookByBookTypeCount(String typeName) {
        Query query = mManager.createQuery("SELECT count (b) FROM Book b where b.mBookType.typeName  =: typeName");
        query.setParameter("typeName", typeName);
        return  (Long) query.getSingleResult();
    }


}
