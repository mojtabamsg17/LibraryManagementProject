package com.example.librarymanagement.services;


import com.example.librarymanagement.dao.GenericDaoCrudImpl;
import com.example.librarymanagement.entities.BookOrder;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class BookOrderService {
    private final GenericDaoCrudImpl<BookOrder> bookOrderDao;

    public BookOrderService(GenericDaoCrudImpl<BookOrder> bookOrderDao) {
        this.bookOrderDao = bookOrderDao;
    }

    @PostConstruct
    public void init() {
        bookOrderDao.setClassType(BookOrder.class);
    }

    @Transactional
    public void save(BookOrder bookOrder) {
         bookOrderDao.save(bookOrder);
    }

    public BookOrder findById(Long id){
        return bookOrderDao.findById(id);
    }

    public List<BookOrder> findAll(Integer page, Integer limit){
        return bookOrderDao.findAll(page, limit);
    }

    @Transactional
    public void delete(Long id) {
        bookOrderDao.delete(id);
    }

    @Transactional
    public void update(BookOrder bookOrder){
        bookOrderDao.update(bookOrder);
    }

    }
