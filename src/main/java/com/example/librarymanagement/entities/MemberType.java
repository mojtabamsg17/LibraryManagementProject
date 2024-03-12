package com.example.librarymanagement.entities;



import com.example.librarymanagement.entities.entity.EntityInterface;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.Period;

@Entity
@Table(name = "membertype_finallibrary")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class MemberType  implements EntityInterface {
    @Id
    @SequenceGenerator(name = "finalLibraryMemberType_sequence", sequenceName = "memberTypeSequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "finalLibraryMemberType_sequence")
    private Long id;

    @Column(unique = true)
    private String memberTypeName;
    private Integer paymentPerMonth;
    private Integer maxTotalBookCount;
    private Integer freeGeneralBookCount;
    private Integer freeSpecialBookCount;
    private Integer freeBorrowedRareBookCount;
    private Integer borrowedRareBookCount;
    private Integer extraGeneralBookCount;
    private Integer extraSpecialBookCount;
    private Integer paymentPerExtraSpecialBook;
    private Integer paymentPerExtraGeneralBook;
    private Integer paymentPerRareBook;


//    private
//    private Integer extraBorrowedCount;

//    @OneToMany(mappedBy = "mRole" )
//    private List<User> mUserList;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMemberTypeName() {
        return memberTypeName;
    }

    public void setMemberTypeName(String roleName) {
        this.memberTypeName = roleName;
    }

//    public List<User> getUserList() {
//        return mUserList;
//    }
//
//    public void setUserList(List<User> userList) {
//        mUserList = userList;
//    }

    public Integer getPaymentPerMonth() {
        return paymentPerMonth;
    }

    public void setPaymentPerMonth(Integer paymentPerMonth) {
        this.paymentPerMonth = paymentPerMonth;
    }

    public Integer getMaxTotalBookCount() {
        return maxTotalBookCount;
    }

    public void setMaxTotalBookCount(Integer maxTotalBorrowedBookCount) {
        this.maxTotalBookCount = maxTotalBorrowedBookCount;
    }

    public Integer getFreeGeneralBookCount() {
        return freeGeneralBookCount;
    }

    public void setFreeGeneralBookCount(Integer freeBorrowedGeneralBookCount) {
        this.freeGeneralBookCount = freeBorrowedGeneralBookCount;
    }

    public Integer getFreeSpecialBookCount() {
        return freeSpecialBookCount;
    }

    public void setFreeSpecialBookCount(Integer freeBorrowedSpecialBookCount) {
        this.freeSpecialBookCount = freeBorrowedSpecialBookCount;
    }

    public Integer getFreeBorrowedRareBookCount() {
        return freeBorrowedRareBookCount;
    }

    public void setFreeBorrowedRareBookCount(Integer freeBorrowedRareBookCount) {
        this.freeBorrowedRareBookCount = freeBorrowedRareBookCount;
    }

    public Integer getBorrowedRareBookCount() {
        return borrowedRareBookCount;
    }

    public void setBorrowedRareBookCount(Integer borrowedRareBookCount) {
        this.borrowedRareBookCount = borrowedRareBookCount;
    }

    public Integer getExtraGeneralBookCount() {
        return extraGeneralBookCount;
    }

    public void setExtraGeneralBookCount(Integer extraBorrowedGeneralBookCount) {
        this.extraGeneralBookCount = extraBorrowedGeneralBookCount;
    }

    public Integer getExtraSpecialBookCount() {
        return extraSpecialBookCount;
    }

    public void setExtraSpecialBookCount(Integer extraBorrowedSpecialBookCount) {
        this.extraSpecialBookCount = extraBorrowedSpecialBookCount;
    }

    public Integer getPaymentPerExtraSpecialBook() {
        return paymentPerExtraSpecialBook;
    }

    public void setPaymentPerExtraSpecialBook(Integer paymentPerExtraBorrowedSpecialBook) {
        this.paymentPerExtraSpecialBook = paymentPerExtraBorrowedSpecialBook;
    }

    public Integer getPaymentPerExtraGeneralBook() {
        return paymentPerExtraGeneralBook;
    }

    public void setPaymentPerExtraGeneralBook(Integer paymentPerExtraBorrowedGeneralBookCount) {
        this.paymentPerExtraGeneralBook = paymentPerExtraBorrowedGeneralBookCount;
    }

    public Integer getPaymentPerRareBook() {
        return paymentPerRareBook;
    }

    public void setPaymentPerRareBook(Integer paymentPerRareBook) {
        this.paymentPerRareBook = paymentPerRareBook;
    }

    public static void main(String[] args) {
        System.out.println(LocalDate.now());
        LocalDate of = LocalDate.of(2024, 1, 20);
        Period between = Period.between(LocalDate.now(),of);
        System.out.println(between.getDays());
        System.out.println(between.getMonths());
        System.out.println(between.getYears());
//        String s= "2024-01-24";
//        String[] split = s.split("-");
//        for (String s1 : split) {
//            System.out.println(s1);
//        }
        System.out.println("--------------------------------------------");
        of = LocalDate.of(2023, 12, 10);
         between = Period.between(LocalDate.now(),of);
        System.out.println(between.getDays());
        System.out.println(between.getMonths());
        System.out.println(between.getYears());
//        System.out.println(LocalDate.now().plusMonths(2L).plusDays(2L).plusYears(1));
    }

}
