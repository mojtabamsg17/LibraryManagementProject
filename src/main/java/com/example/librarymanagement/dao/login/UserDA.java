package com.example.librarymanagement.dao.login;


import com.example.librarymanagement.entities.User;
import com.example.librarymanagement.exceptions.login.AccessError;
import com.example.librarymanagement.exceptions.login.InvalidUsername;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

@Repository
public class UserDA {
    @PersistenceContext
    private EntityManager entityManager;
//    private final EmailService emailService;
//
//    public UserDA(EmailService emailService) {
//        this.emailService = emailService;
//    }

    //*******************************************LOGIN*************************************************************//

    public Integer selectOneByUsernameAndPassword(User userLogin) throws InvalidUsername, AccessError {
        Query query = entityManager.createQuery("select o from User o where o.username=: name and o.password=:password");
        query.setParameter("name", userLogin.getUsername());
        query.setParameter("password", userLogin.getPassword());
        User user = (User) query.getSingleResult();

        if (user != null) {
            userLogin.setId(user.getId());
            userLogin.setFirstName(user.getFirstName());
            userLogin.setRole(user.getRole());
        } else {
            throw new InvalidUsername("Invalid Username or Password ");
        }
        return 1;
    }



    //***********************************************ADMIN PAGE****************************************************//




//    public List<User> findAllPaginationUserRepo(Integer pageNum) {
//        int firstResult = (pageNum - 1) * 3;
//        int maxResult = 3;
//        Query query = entityManager.createQuery("select o from User o where o.exist =: exist");
//        query.setParameter("exist", 1);
//        query.setFirstResult(firstResult);
//        query.setMaxResults(maxResult);
//
//        return query.getResultList();
//
//    }

    //************************************FORGET PASSWORD**********************************************************//
    public Integer sendEmailRepo(User userLogin) {
        System.out.println(userLogin.getEmailAddress());
        System.out.println(userLogin.getUsername());
        Query query = entityManager.createQuery("select o from User o where o.username=: username and o.emailAddress=: emailAddress");
        query.setParameter("username", userLogin.getUsername());
        query.setParameter("emailAddress", userLogin.getEmailAddress());
        User user = (User) query.getSingleResult();
        userLogin.setPassword(user.getPassword());
        return 1;

    }

    //***************************************Methods not yet implemented*******************************************//




//    public List<User> usersOnline() {
//        Query query = entityManager.createQuery("select o from User o where o.status =: online");
//        query.setParameter("online", "Online");
//        List<User> userList = query.getResultList();
//        return userList;
//    }

//    public Integer logout(Long id) {
//
//        User user = entityManager.find(User.class, id);
//        user.setUserStatus("Offline");
//        entityManager.merge(user);
//        return 1;
//    }


}
