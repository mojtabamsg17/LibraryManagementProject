package com.example.librarymanagement.controllers;


import com.example.librarymanagement.entities.BookType;
import com.example.librarymanagement.services.BookTypeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booktypes")
public class BookTypeController {

    private final BookTypeService bookTypeService;

    public BookTypeController(BookTypeService bookTypeService) {
        this.bookTypeService = bookTypeService;
    }

    @GetMapping("/findAll/{page}/{limit}")
    public List<BookType> getAllBookTypes(@PathVariable("page") Integer page,
                                          @PathVariable("limit") Integer limit) {
        return bookTypeService.findAll(page, limit);
    }

    @GetMapping("/{id}")
    public BookType getBookTypeById(@PathVariable("id") Long id) {
        return bookTypeService.findById(id);
    }

    @PostMapping("/save")
    public void createBookType(@RequestBody BookType bookType) {
        bookTypeService.save(bookType);
    }

    @PutMapping("/update")
    public void updateBookType(@RequestBody BookType bookType) {
        bookTypeService.update(bookType);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBookType(@PathVariable("id") Long id) {
        bookTypeService.delete(id);
    }
}