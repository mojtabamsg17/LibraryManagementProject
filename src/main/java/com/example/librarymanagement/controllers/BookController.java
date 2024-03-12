package com.example.librarymanagement.controllers;


import com.example.librarymanagement.dto.BookDto;
import com.example.librarymanagement.dto.BookSaveDto;
import com.example.librarymanagement.entities.Book;
import com.example.librarymanagement.services.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/findByBookType/{bookType}/{page}/{limit}")
    public List<BookDto> findBookByBookType(@PathVariable("bookType") String typeName,
                                            @PathVariable("page") Integer page,
                                            @PathVariable("limit") Integer limit) {
//        ResponseEntity responseEntity = new ResponseEntity(body, HttpStatus.SUCCESS);
        List<BookDto> bookByBookType = bookService.findBookByBookType(typeName, page, limit);
        return bookByBookType;
    }

    @GetMapping(value = "/findByBookTypeCount/{bookType}")
    public Book findBookByBookTypeCount(@PathVariable("bookType") String typeName) {
        Long count = bookService.findBookByBookTypeCount(typeName);
        Book b = new Book();
        b.setBalance(count.intValue());
        return b;
    }

    @GetMapping("/findAll/{page}/{limit}")
    public List<Book> getAllBooks(@PathVariable("page") Integer page,
                                  @PathVariable("limit") Integer limit) {
        return bookService.findAll( page, limit);
    }

    @GetMapping("/findAll")
    public List<Book> getAllBooks() {
        return bookService.findAll( );
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable("id") Long id) {
        return bookService.findById(id);
    }

    @PostMapping("/save")
    public void createBook(@RequestBody BookSaveDto bookDto) {
            bookService.save(bookDto);
    }

    @PutMapping("/update")
    public void updateBook(@RequestBody Book book) {
        bookService.update(book);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBook(@PathVariable("id") Long id) {
        bookService.delete(id);
    }
}