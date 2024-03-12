package com.example.librarymanagement.services;


import com.example.librarymanagement.dao.GenericDaoCrudImpl;
import com.example.librarymanagement.dao.MemberTypeRepository;
import com.example.librarymanagement.dao.RoleRepository;
import com.example.librarymanagement.dao.UserRepository;
import com.example.librarymanagement.dto.MyBookDto;
import com.example.librarymanagement.entities.*;
import com.example.librarymanagement.exceptions.*;
import com.example.librarymanagement.exceptions.login.AccessError;
import com.example.librarymanagement.services.email.EmailService;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final GenericDaoCrudImpl<User> userDao;

    private final BookService bookService;
    private final RoleRepository roleDao;
    private final UserRepository mUserRepository;

    private final MemberTypeRepository mMemberTypeRepository;

    private final BookLoanService mBookLoanService;
    private final EmailService emailService;

    private final RoleService mRoleService;
    private final RoleRepository mRoleRepository;


    public UserService(GenericDaoCrudImpl<User> userDao, BookService bookService, RoleRepository roleDao, UserRepository userRepository, MemberTypeRepository memberTypeRepository, BookLoanService bookLoanService, EmailService emailService, RoleService roleService, RoleRepository roleRepository) {
        this.userDao = userDao;
        this.bookService = bookService;
        this.roleDao = roleDao;
        mUserRepository = userRepository;
        mMemberTypeRepository = memberTypeRepository;
        mBookLoanService = bookLoanService;
        this.emailService = emailService;
        mRoleService = roleService;
        mRoleRepository = roleRepository;
    }

    @PostConstruct
    public void init() {
        userDao.setClassType(User.class);
    }

    @Transactional
    public void createUser(User user) {
        Executors.newSingleThreadExecutor().execute(()->emailService.sendSimpleMessage(user.getEmailAddress(), "Library",
                "WELCOME YOU ARE NOW A MEMBER OF OUR FAMILY :)"));
        Role customerRole = this.getRoleByName("customer");
        user.setRole(customerRole);
        user.setWallet(0);
        user.setBanned(false);
        user.setJoinDate(LocalDate.now());
        userDao.save(user);
    }

    @Transactional
    public void save(User user) {
        userDao.save(user);
    }


    @Transactional(readOnly = true)
    public User findById(Long id) {
        return userDao.findById(id);
    }

    @Transactional(readOnly = true)
    public List<User> findAll(Integer page, Integer limit) {
        return userDao.findAll(page, limit);
    }
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return userDao.findAll();
    }

    @Transactional
    public void delete(Long id) {
        userDao.delete(id);
    }

    @Transactional
    public void update(User user) {
        userDao.update(user);
    }


    public User login(User user) throws Exception, AccessError {
        return mUserRepository.findByUserAndPass(user);
    }

    @Transactional
    public void chargeWallet(Integer chargeValue, User user) {
        mUserRepository.chargeWallet(chargeValue, user);
    }

    @Transactional
    public void setMemberType(User user, String roleName) {
        MemberType memberType = mMemberTypeRepository.findRoleByName(roleName);
        if (!user.isBanned()) {
            if (user.getMemberType() == null) {
                if (user.getWallet() >= memberType.getPaymentPerMonth()) {
                    user.setWallet(user.getWallet() - memberType.getPaymentPerMonth());
                    user.setMemberType(memberType);
                    user.setMemberTypeChangeDate(LocalDate.now());
                    user.setDateOfRoleEnd(LocalDate.now().plusMonths(1));
                    user.setBanned(false);
                    userDao.update(user);
                } else
                    throw new NotEnoughWalletException();
            } else if (!memberType.getMemberTypeName().equals(user.getMemberType().getMemberTypeName())) {
                if (user.getMemberTypeChangeDate() != null && user.getDateOfRoleEnd() != null && (Period.between(user.getMemberTypeChangeDate(), user.getDateOfRoleEnd()).getMonths() >= 1 || Period.between(user.getMemberTypeChangeDate(), user.getDateOfRoleEnd()).getDays() >= 25 && user.getWallet() >= memberType.getPaymentPerMonth() / 2)) {
                    user.setMemberType(memberType);
                    user.setWallet(user.getWallet() - memberType.getPaymentPerMonth() / 2);
                    user.setMemberTypeChangeDate(LocalDate.now());
                    userDao.update(user);
                }
//                else if (user.getMemberTypeChangeDate() != null && user.getDateOfRoleEnd() != null) {
//                    if (user.getWallet() >= memberType.getPaymentPerMonth()){
//                    if (user.getMemberType() == null) {
//                        user.setWallet(user.getWallet() - memberType.getPaymentPerMonth());
//                        user.setMemberType(memberType);
//                        user.setMemberTypeChangeDate(LocalDate.now());
//                        user.setDateOfRoleEnd(LocalDate.now().plusMonths(1));
//                        userDao.update(user);
//                    }
//                    }else
//                        throw new NotEnoughWalletException();
//                } //if (!role.getRoleName().equals(user.getRole().getRoleName())) {

            } else
                throw new RepeatRoleException();
        } else
            throw new BannedAccountException();


    }

    public Integer getWallet(Long id) {
        return mUserRepository.getWallet(id);
    }

    @Transactional
    public void borrow(User user, Long bookId) {
        user = userDao.findById(user.getId());
        MemberType memberType = user.getMemberType();
        Book book = bookService.findById(bookId);
        isSameBookInBorrow(user, book);
        if (user.getBookLoans() == null) {
            List<BookLoan> bookLoans = new ArrayList<>();
            user.setBookLoans(bookLoans);
        }
        if (!user.isBanned()) {
            if (user.getDateOfRoleEnd() != null && (Period.between(LocalDate.now(), user.getDateOfRoleEnd()).getDays() > 0 || Period.between(LocalDate.now(), user.getDateOfRoleEnd()).getMonths() >0)){
            if (user.getTotalBorrowedBookCount() < memberType.getMaxTotalBookCount()) {//if total books is less then max
                if (book.getBookType().getTypeName().equals("general")) {//if bookType is general
                    if (user.getFreeBorrowedGeneralBookCount() < memberType.getFreeGeneralBookCount()) {//if user still can borrow general books for free and bookBalance is more than 0
                        user.setFreeBorrowedGeneralBookCount(user.getFreeBorrowedGeneralBookCount() + 1);
                        addBookToBookLoanListOfUser(user, book);
                    } else if (user.getExtraBorrowedGeneralBookCount() < memberType.getExtraGeneralBookCount()) {//if user can borrow extra book
                        if (user.getWallet() >= memberType.getPaymentPerExtraGeneralBook()) {// wallet checking
                            user.setWallet(user.getWallet() - memberType.getPaymentPerExtraGeneralBook());
                            user.setExtraBorrowedGeneralBookCount(user.getExtraBorrowedGeneralBookCount() + 1);
                            addBookToBookLoanListOfUser(user, book);
                        } else
                            throw new NotEnoughWalletException();

                    } else
                        throw new GeneralBooksCountLimitationException();
                } else if (book.getBookType().getTypeName().equals("specialize")) {
                    if (user.getFreeBorrowedSpecialBookCount() < memberType.getFreeSpecialBookCount()) {//if user still can borrow special books for free and bookBalance is more than 0
                        user.setFreeBorrowedSpecialBookCount(user.getFreeBorrowedSpecialBookCount() + 1);
                        addBookToBookLoanListOfUser(user, book);
                    } else if (user.getExtraBorrowedSpecialBookCount() < memberType.getExtraSpecialBookCount()) {//if user can borrow extra special book and the wallet is enough
                        if (user.getWallet() >= memberType.getPaymentPerExtraSpecialBook()) {// wallet checking
                            user.setWallet(user.getWallet() - memberType.getPaymentPerExtraSpecialBook());
                            user.setExtraBorrowedSpecialBookCount(user.getExtraBorrowedSpecialBookCount() + 1);
                            addBookToBookLoanListOfUser(user, book);
                        } else
                            throw new NotEnoughWalletException();
                    } else
                        throw new SpecialBooksCountLimitationException();
                } else if (book.getBookType().getTypeName().equals("rare")) {
                    if (memberType.getBorrowedRareBookCount() == 0) {
                        if (user.getBorrowedRareBookCount() < memberType.getFreeBorrowedRareBookCount()) {//if user still can borrow special books for free and bookBalance is more than 0
                            user.setBorrowedRareBookCount(user.getBorrowedRareBookCount() + 1);
                            addBookToBookLoanListOfUser(user, book);
                        }
                    }
                    throw new NotAllowedToBorrowRareBookException();
                }
            } else throw new BookCountLimitationException();
        }else throw new DateOfMemberTypeIsOver();
        } else
            throw new AccountBannedException();
    }

    @Transactional
    public void addBookToBookLoanListOfUser(User user, Book book) {
        if (bookBalanceChecking(book)) {// checking book balance
            user = userDao.findById(user.getId());
            book.setBalance(book.getBalance() - 1);
            BookLoan bookLoan = new BookLoan();
            bookLoan.setReservationDate(LocalDate.now());
            bookLoan.setReturnDate(user.getDateOfRoleEnd());//user can borrow until the date that memberType is valid
            bookLoan.setBook(book);
            bookLoan.setUser(user);
            int total = user.getTotalBorrowedBookCount() + 1;
            user.setTotalBorrowedBookCount(total);
            user.getBookLoans().add(bookLoan);
            user.setBookLoans(user.getBookLoans());
//                    user.setBookLoans();

            bookService.update(book);
            userDao.update(user);
        } else
            throw new BookBalanceException();
    }

    private boolean bookBalanceChecking(Book book) {
        if (book.getBalance() > 0) {
            return true;
        } else
            return false;
    }

    @Transactional
    public void bookGiveBack(User user, Long bookId) {
        Book book = bookService.findById(bookId);
        user = userDao.findById(user.getId());
        checkingIfBookIsBorrowedToTheUser(user, book);
        if (book.getBookType().getTypeName().equals("general")) {
//            user.getBookLoans().remove(book);
            if (user.getExtraBorrowedGeneralBookCount() > 0) {// decrease from extra borrowed books counter if it's more than 0
                user.setExtraBorrowedGeneralBookCount(user.getExtraBorrowedGeneralBookCount() - 1);
                removeFromBookLoanListAndUpdate(user, book);
            } else if (user.getFreeBorrowedGeneralBookCount() > 0) {//decrease from free borrowed books counter if it's more than 0
                user.setFreeBorrowedGeneralBookCount(user.getFreeBorrowedGeneralBookCount() - 1);
                removeFromBookLoanListAndUpdate(user, book);
            }
        } else if (book.getBookType().getTypeName().equals("specialize")) {
            if (user.getExtraBorrowedSpecialBookCount() > 0) {// decrease from extra borrowed books counter if it's more than 0
                user.setExtraBorrowedSpecialBookCount(user.getExtraBorrowedSpecialBookCount() - 1);
                removeFromBookLoanListAndUpdate(user, book);
            } else if (user.getFreeBorrowedSpecialBookCount() > 0) {//decrease from free borrowed books counter if it's more than 0
                user.setFreeBorrowedSpecialBookCount(user.getFreeBorrowedSpecialBookCount() - 1);
                removeFromBookLoanListAndUpdate(user, book);
            }
        } else if (book.getBookType().getTypeName().equals("rare")) {
            if (user.getExtraBorrowedRareBookCount() > 0) {// decrease from extra borrowed books counter if it's more than 0
                user.setExtraBorrowedRareBookCount(user.getExtraBorrowedRareBookCount() - 1);
                removeFromBookLoanListAndUpdate(user, book);
            }
            else if (user.getBorrowedRareBookCount() > 0) {//decrease from free borrowed books counter if it's more than 0
                user.setBorrowedRareBookCount(user.getBorrowedRareBookCount() - 1);
                removeFromBookLoanListAndUpdate(user, book);
            }
        }
    }

    @Transactional
    public void removeFromBookLoanListAndUpdate(User user, Book book) {
        user = userDao.findById(user.getId());
        book.setBalance(book.getBalance() + 1);
        user.setTotalBorrowedBookCount(user.getTotalBorrowedBookCount() - 1);
        for (BookLoan bookLoan : user.getBookLoans()) {
            if (bookLoan.getUser().getId() == user.getId() && bookLoan.getBook().getId() == book.getId())
                mBookLoanService.delete(bookLoan.getId());
        }
        user.setBookLoans(user.getBookLoans().stream().filter(b -> b.getBook().getId() != book.getId()).collect(Collectors.toList()));
        book.setBookLoans(book.getBookLoans().stream().filter(b -> b.getBook().getId() != book.getId()).collect(Collectors.toList()));
        bookService.update(book);
        userDao.update(user);
    }

    public void checkingIfBookIsBorrowedToTheUser(User user, Book book) {
        if (!user.getBookLoans().stream().anyMatch(a -> a.getBook().getId() == book.getId()))
            throw new BookIsNotBorrowedToThisUserException();
    }
//    public User chargeWallet(Integer chargeValue) {
//        mUserRepository.chargeWallet(chargeValue);
//    }

    public void isSameBookInBorrow(User user, Book book) {//check is the book in borrow for this user or not
        if (user.getBookLoans().stream().anyMatch(a -> a.getBook().getId() == book.getId()))
            throw new RepeatBookException();
    }

    @Transactional(readOnly = true)
    public List<MyBookDto> myBooks(Long id) {
        return mUserRepository.findMyBooks(id);
    }

    @Transactional(readOnly = true)
    public Role getRoleByName(String roleName) {
        return mRoleService.findRoleByName(roleName);
    }

    @Transactional
    public void updateUserPersonalData(User userInfo) {
        User user = userDao.findById(userInfo.getId());
        if (userInfo.getFirstName() != null)
            user.setFirstName(userInfo.getFirstName());
        if (userInfo.getLastName() != null)
            user.setLastName(userInfo.getLastName());
        if (userInfo.getEmailAddress() != null)
            user.setEmailAddress(userInfo.getEmailAddress());
        if (userInfo.getUsername() != null)
            user.setUsername(userInfo.getUsername());
        if (userInfo.getPassword() != null)
            user.setPassword(userInfo.getPassword());

        userDao.update(user);
    }
}
