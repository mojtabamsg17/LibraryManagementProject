package com.example.librarymanagement.services;


import com.example.librarymanagement.dao.BookRepository;
import com.example.librarymanagement.dao.GenericDaoCrudImpl;
import com.example.librarymanagement.dto.BookDto;
import com.example.librarymanagement.dto.BookSaveDto;
import com.example.librarymanagement.entities.Book;
import com.example.librarymanagement.entities.BookType;
import com.example.librarymanagement.mapstruct.BookMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {
    private final GenericDaoCrudImpl<Book> bookDao;

    private final BookRepository mBookRepository;
    private final BookTypeService mBookTypeService;

    public BookService(GenericDaoCrudImpl<Book> bookDao, BookRepository bookRepository, BookTypeService bookTypeService) {
        this.bookDao = bookDao;
        mBookRepository = bookRepository;
        mBookTypeService = bookTypeService;
    }

    @PostConstruct
    public void init() {
        bookDao.setClassType(Book.class);
    }

    @Transactional
    public void save(BookSaveDto bookDto) {
//        Book book = BookMapper.INSTANCE.bookDtoToBook(bookDto);
        BookType bookTypeByName = mBookTypeService.findBookTypeByName(bookDto.getTypeName());
        Book book= new Book(bookDto.getTitle(),bookDto.getAuthor(),bookDto.getTotalBookCount());
        book.setBalance(0);
        book.setBookType(bookTypeByName);
         bookDao.save(book);
    }

    public Book findById(Long id){
        return bookDao.findById(id);
    }

    public List<Book> findAll(Integer page, Integer limit){
        List<Book> all = bookDao.findAll( page, limit);
        return all;
    }

    public List<Book> findAll(){
        List<Book> all = bookDao.findAll();
        return all;
    }

    public List<BookDto> findBookByBookType(String typeName, Integer page, Integer limit) {
        List<Book> bookByBookType = mBookRepository.findBookByBookType(typeName, page, limit);
        List<BookDto> bookDtos = new ArrayList<>();
        for (Book book : bookByBookType) {
            bookDtos.add(BookMapper.INSTANCE.sourceToTarget(book));
        }
        return bookDtos;
    }


    @Transactional
    public void delete(Long id) {
        bookDao.delete(id);
    }

    @Transactional
    public void update(Book book){
        bookDao.update(book);
    }

    public Long findBookByBookTypeCount(String typeName) {
        return mBookRepository.findBookByBookTypeCount(typeName);
    }
}
