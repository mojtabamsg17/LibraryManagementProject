package com.example.librarymanagement.scaduling;


import com.example.librarymanagement.entities.BookLoan;
import com.example.librarymanagement.entities.Fine;
import com.example.librarymanagement.entities.User;
import com.example.librarymanagement.services.BookLoanService;
import com.example.librarymanagement.services.FineService;
import com.example.librarymanagement.services.UserService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Component
public class SchedulerClass {
    private final BookLoanService mBookLoanService;
    private final FineService mFineService;
    private final UserService mUserService;


    @Scheduled(cron = "0 0 0 * * *")
    public void fineUsersThatNotGavedBackTheBorrowedBooks() throws IOException {
        List<BookLoan> all = mBookLoanService.findAll();
        all.stream().filter(bookLoan -> {
                    Period between = Period.between(LocalDate.now(), bookLoan.getReturnDate());
                    System.out.println("years: "+between.getYears());
                    System.out.println("month: "+between.getMonths());
                    System.out.println("days: "+between.getDays());
                    if(between.getMonths() < 0 || between.getYears() < 0 || between.getDays() < 0){
                        return true;
                    }
                    return false;
                }
        ).forEach(bookLoan -> {
            User user = bookLoan.getUser();
            user = mUserService.findById(user.getId());
            if (user.getFine() == null) {
                Fine fine = new Fine();
                fine.setUser(user);
                fine.setFineAmount(0.0);
                user.setFine(fine);
            }
            user.setBanned(true);
            Fine fine = user.getFine();
            double value = fine.getFineAmount() + FINE_VALUE;
            fine.setFineAmount(value);
            user.setFine(fine);
//            mFineService.update(fine);
            mUserService.update(user);
            mFineService.update(fine);
            });

    }

    public SchedulerClass(BookLoanService bookLoanService, FineService fineService, UserService userService) {
        mBookLoanService = bookLoanService;
        mFineService = fineService;
        mUserService = userService;
    }
    private final Double FINE_VALUE = 10.0;
    //At 12:00 AM, only on Friday
}
