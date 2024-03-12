package com.example.librarymanagement.dao;

import com.example.librarymanagement.dto.MyBookDto;
import com.example.librarymanagement.entities.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {
    private final EntityManager mManager;

    public UserRepository(EntityManager manager) {
        mManager = manager;
    }


    public User findUserByUsername(String username) {
        Query query = mManager.createQuery("select o from User o where o.username =: username");
        query.setParameter("username", username);
        User user = (User) query.getSingleResult();
        return user;
    }

    public User findByUserAndPass(User userLogin) {
        Query query = mManager.createQuery("select o from User o where o.username=: name and o.password=:password");
        query.setParameter("name", userLogin.getUsername());
        query.setParameter("password", userLogin.getPassword());
        User user = (User) query.getSingleResult();

//        userLogin.setId(user.getId());
//        userLogin.setFirstName(user.getFirstName());
//        userLogin.setRole(user.getRole());

//            throw new InvalidUsername("Invalid Username or Password ");

//        return userLogin;
        return user;
    }

    public void chargeWallet(Integer chargeValue, User user) {
        if (user.getWallet() != null)
            user.setWallet(user.getWallet() + chargeValue);
        else
            user.setWallet(chargeValue);
        mManager.merge(user);
    }

    public Integer getWallet(Long id) {
        Query query = mManager.createQuery("select o.wallet from User o where o.id=: id");
        query.setParameter("id", id);
        Integer wallet = (Integer) query.getSingleResult();
        if (wallet == null)
            return 0;
        else
            return wallet;
    }

    public List<MyBookDto> findMyBooks(Long id) {
        Query query = mManager.createQuery("select  new com.example.libraryfinalproject.dto.MyBookDto(o.mBook.id,o.mBook.title,o.mBook.mBookType.typeName,o.reservationDate,o.returnDate) from BookLoan o where o.mUser.id =: id");
        query.setParameter("id", id);
        List<MyBookDto> bookDtos=  query.getResultList();
        return bookDtos;
    }
}
