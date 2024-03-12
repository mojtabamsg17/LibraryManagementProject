package com.example.librarymanagement.services;

import com.example.librarymanagement.dao.BooktypeRepository;
import com.example.librarymanagement.dao.GenericDaoCrudImpl;
import com.example.librarymanagement.entities.BookType;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookTypeService {
    private final GenericDaoCrudImpl<BookType> bookTypeDao;

    private final BooktypeRepository bookTypeRepository;

    public BookTypeService(GenericDaoCrudImpl<BookType> bookTypeDao, BooktypeRepository bookTypeRepository) {
        this.bookTypeDao = bookTypeDao;
        this.bookTypeRepository = bookTypeRepository;
    }

    @PostConstruct
    public void init() {
        bookTypeDao.setClassType(BookType.class);
    }
    @Transactional
    public void save(BookType bookType) {
        bookTypeDao.save(bookType);
    }

    @Transactional(readOnly = true)
    public BookType findById(Long id){
        return bookTypeDao.findById(id);
    }

    @Transactional(readOnly = true)
    public List<BookType> findAll(Integer page, Integer limit){
        return bookTypeDao.findAll(page, limit);
    }

    @Transactional
    public void delete(Long id) {
        bookTypeDao.delete(id);
    }

    @Transactional
    public void update(BookType bookType){
        bookTypeDao.update(bookType);
    }

    @Transactional(readOnly = true)
    public BookType findBookTypeByName(String typeName) {
       return bookTypeRepository.findBookTypeByName(typeName);
    }

    }
