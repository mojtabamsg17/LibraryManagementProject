package com.example.librarymanagement.dao;


import com.example.librarymanagement.dto.BookDto;
import com.example.librarymanagement.dto.BorrowedBooksDto;
import com.example.librarymanagement.entities.Book;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class BookLoanRepository {
    private final EntityManager entityManager;
    public BookLoanRepository(EntityManager manager) {
        entityManager = manager;
    }


    public List<BorrowedBooksDto> findAllBorrowedBooks(Integer page, Integer limit) {
        Query query = entityManager.createQuery("select  new com.example.librarymanagement.dto.BorrowedBooksDto(o.mBook.id,o.mBook.title,o.mBook.mBookType.typeName,o.reservationDate,o.returnDate,o.mUser.username,o.mUser.id) from BookLoan o");
        query.setFirstResult(((page) * limit));
        query.setMaxResults(limit);
        List<BorrowedBooksDto> list = (List<BorrowedBooksDto>   )query.getResultList();
        return  list;
    }

    public List<BookDto> BorrowedBooksDynamicSearch(String name) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Book> query = cb.createQuery(Book.class);
        Root<Book> bookLoan = query.from(Book.class);

        List<Predicate> predicates = new ArrayList<>();


        if (name != null) {
            predicates.add(cb.equal(bookLoan.get("title"), name));
        }


        query.where(predicates.toArray(new Predicate[0]));


        TypedQuery<Book> q = entityManager.createQuery(query);

        List<Book> resultList = q.getResultList();
        List<BookDto> bookDtos = new ArrayList<>();
        for (Book book : resultList) {
            BookDto bookDto = new BookDto();
//            bookDto.setTypeName(book.getBookType().getTypeName());
            bookDto.setId(book.getId());
            bookDto.setTitle(book.getTitle());
            bookDto.setAuthor(book.getAuthor());
            bookDto.setBalance(book.getBalance().toString());
            bookDto.setTotalBookCount(book.getTotalBookCount());
            bookDtos.add(bookDto);

        }
        return bookDtos;
    }
}
