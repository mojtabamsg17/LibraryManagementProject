package com.example.librarymanagement.services;


import com.example.librarymanagement.dao.BookLoanRepository;
import com.example.librarymanagement.dao.GenericDaoCrudImpl;
import com.example.librarymanagement.dto.BookDto;
import com.example.librarymanagement.dto.BorrowedBooksDto;
import com.example.librarymanagement.entities.BookLoan;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookLoanService {
    private final GenericDaoCrudImpl<BookLoan> bookLoanDao;

    private final BookLoanRepository mBookLoanRepository;

    public BookLoanService(GenericDaoCrudImpl<BookLoan> bookLoanDao, BookLoanRepository bookLoanRepository) {
        this.bookLoanDao = bookLoanDao;
        mBookLoanRepository = bookLoanRepository;
    }

    @PostConstruct
    public void init() {
        bookLoanDao.setClassType(BookLoan.class);
    }

    @Transactional
    public void save(BookLoan bookOrder) {
         bookLoanDao.save(bookOrder);
    }

    @Transactional(readOnly = true)
    public BookLoan findById(Long id){
        return bookLoanDao.findById(id);
    }

//    public List<BookLoan> findAll(){
//        return bookLoanDao.findAll(page, limit);
//    }

    @Transactional
    public void delete(Long id) {
        bookLoanDao.delete(id);
    }

    @Transactional
    public void update(BookLoan bookOrder){
        bookLoanDao.update(bookOrder);
    }

    @Transactional(readOnly = true)
    public List<BookLoan> findAll(Integer page, Integer limit) {
        return bookLoanDao.findAll(page, limit);
    }
    @Transactional(readOnly = true)
    public List<BookLoan> findAll() {
        return bookLoanDao.findAll();
    }

    @Transactional(readOnly = true)
    public List<BorrowedBooksDto> findAllBorrowedBooks(Integer page, Integer limit) {
        return mBookLoanRepository.findAllBorrowedBooks(page,limit);
    }
    @Transactional(readOnly = true)
    public List<BookDto> borrowedBooksDynamicSearch(/*String name,*/String name) {
        return mBookLoanRepository.BorrowedBooksDynamicSearch(name);
    }

}
