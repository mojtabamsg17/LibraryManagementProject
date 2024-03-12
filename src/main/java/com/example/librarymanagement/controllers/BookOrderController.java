package com.example.librarymanagement.controllers;


import com.example.librarymanagement.entities.BookOrder;
import com.example.librarymanagement.services.BookOrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookorders")
public class BookOrderController {

    private final BookOrderService bookOrderService;

    public BookOrderController(BookOrderService bookOrderService) {
        this.bookOrderService = bookOrderService;
    }

    @GetMapping("/findAll/{page}/{limit}")
    public List<BookOrder> getAllBookOrders(@PathVariable("page") Integer page,
                                            @PathVariable("limit") Integer limit) {
        return bookOrderService.findAll(page,limit);
    }

    @GetMapping("/{id}")
    public BookOrder getBookOrderById(@PathVariable("id") Long id) {
        return bookOrderService.findById(id);
    }

    @PostMapping("/save")
    public void createBookOrder(@RequestBody BookOrder bookOrder) {
        bookOrderService.save(bookOrder);
    }

    @PutMapping("/update")
    public void updateBookOrder(@RequestBody BookOrder bookOrder) {
        bookOrderService.update(bookOrder);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBookOrder(@PathVariable("id") Long id) {
        bookOrderService.delete(id);
    }
}