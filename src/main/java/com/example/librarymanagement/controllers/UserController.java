package com.example.librarymanagement.controllers;


import com.example.librarymanagement.dto.BookDto;
import com.example.librarymanagement.dto.BorrowedBooksDto;
import com.example.librarymanagement.dto.MyBookDto;
import com.example.librarymanagement.dto.UserDto;
import com.example.librarymanagement.entities.User;
import com.example.librarymanagement.exceptions.CantChangeYourRoleException;
import com.example.librarymanagement.exceptions.login.AccessError;
import com.example.librarymanagement.services.BookLoanService;
import com.example.librarymanagement.services.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {


    private final UserService userService;
    private final BookLoanService mBookLoanService;

    public UserController(UserService userService,BookLoanService mBookLoanService) {
        this.userService = userService;
        this.mBookLoanService = mBookLoanService;
    }

    @GetMapping("/findAll/{page}/{limit}")
    public List<User> getAllUsers(@PathVariable("page") Integer page,
                                  @PathVariable("limit") Integer limit) {
        return userService.findAll(page, limit);
    }

    @GetMapping("/findAll")
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        return userService.findById(id);
    }

    @PostMapping("/save")
    public ResponseEntity createUser(@RequestBody User user) {
         userService.createUser(user);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update")
    public void updateUser(@RequestBody User user) {
         userService.update(user);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        userService.delete(id);
    }

    @PostMapping("/login")
    public UserDto login(HttpServletRequest req, HttpServletResponse resp, @RequestBody User user) throws Exception,  AccessError {
        UserDto userDto = new UserDto();
        User userLogin = new User();
        userLogin.setUsername(user.getUsername());
        userLogin.setPassword(user.getPassword());
        try {
            userLogin = userService.login(userLogin);
            req.getSession().setAttribute("user", userLogin);
            userDto.setName(userLogin.getUsername());
            userDto.setRoleName(userLogin.getRole().getRoleName());
            userDto.setId(userLogin.getId());
        } catch (RuntimeException e ) {
            resp.sendRedirect("localhost:9090/login.html");
        }catch (AccessError a) {
            resp.sendRedirect("localhost:9090/login.html");
        }
        if (userDto.getName() != null)
            return userDto;
        else
            return new UserDto().setId(-1L);
    }

    @GetMapping("/logout")
    public ResponseEntity service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        req.getSession().invalidate();
        resp.sendRedirect("/login.html");
        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        return ResponseEntity.ok(response);
    }

    //--------------
    @PostMapping("/chargeWallet/{chargeValue}")
    public ResponseEntity chargeWallet(@PathVariable("chargeValue") Integer chargeValue ,HttpServletRequest req) {
         userService.chargeWallet(chargeValue,(User)req.getSession().getAttribute("user"));
        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getWallet")
    public ResponseEntity setMemberType(HttpServletRequest req){
        User user = (User) req.getSession().getAttribute("user");
        Map<String, Object> response = new HashMap<>();
        response.put("amount", userService.getWallet(user.getId()));
        response.put("status", "SUCCESS");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/setRole/{memberType}")
    public ResponseEntity setMemberType(HttpServletRequest req, @PathVariable("memberType") String memberType){
        userService.setMemberType((User)req.getSession().getAttribute("user"),memberType);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/borrow/{bookId}")
    public ResponseEntity borrow(HttpServletRequest req, @PathVariable("bookId") Long bookId){
        userService.borrow((User)req.getSession().getAttribute("user"),bookId);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/giveBack/{bookId}")
    public ResponseEntity giveBack(HttpServletRequest req, @PathVariable("bookId") Long bookId){
        userService.bookGiveBack((User)req.getSession().getAttribute("user"),bookId);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/myBooks")
    public ResponseEntity myBooks(HttpServletRequest req){
        User user = (User)req.getSession().getAttribute("user");
        List<MyBookDto> bookDtos = userService.myBooks(user.getId());
        Map<String, Object> response = new HashMap<>();
        response.put("myBooks",bookDtos);
        response.put("status", "SUCCESS");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/updatePersonalInfo")
    public ResponseEntity updatePersonalInfo(HttpServletRequest req,@RequestBody User userInfo){
        userService.updateUserPersonalData(userInfo);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/allBorrowedBooks/{page}/{limit}")
    public ResponseEntity allBorrowedBooks(@PathVariable("page") Integer page,
                                           @PathVariable("limit") Integer limit){
        List<BorrowedBooksDto> all = mBookLoanService.findAllBorrowedBooks(page,limit);
        Map<String, Object> response = new HashMap<>();
        response.put("borrowedBooksDto",all);
        response.put("status", "SUCCESS");
        return ResponseEntity.ok(response);
    }
    @GetMapping("/searchBooksDynamicSearch/{name}")
    public List<BookDto> BorrowedBooksDynamicSearch(/*@PathVariable("page") Integer page,*/
                                           @PathVariable(required = false,name = "name") String  name){
//        List<BookDto> all = mBookLoanService.borrowedBooksDynamicSearch(name);
//        Map<String, Object> response = new HashMap<>();
//        response.put("borrowedBooksDto",all);
//        response.put("status", "SUCCESS");
//        return ResponseEntity.ok(response);
        return mBookLoanService.borrowedBooksDynamicSearch(name);
    }

    @PostMapping("/changeRoleByAdmin/{userId}/{roleName}")
    public ResponseEntity changeRoleByAdmin(HttpServletRequest req, @PathVariable("userId") Long userId, @PathVariable("roleName") String roleName){
        User user = (User)req.getSession().getAttribute("user");
        if (user.getId() == userId){// cant change his own role
            throw new CantChangeYourRoleException();
        }
        user = userService.findById(userId);
        user.setRole(userService.getRoleByName(roleName));
        userService.update(user);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        return ResponseEntity.ok(response);
    }
}