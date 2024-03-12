package com.example.librarymanagement.entities;



import com.example.librarymanagement.entities.entity.EntityInterface;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;
import java.util.List;

@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "user_finallibrary")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class User implements EntityInterface {
    @Id
    @SequenceGenerator(name = "finalLibraryUser_sequence", sequenceName = "UserSequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "finalLibraryUser_sequence")
    private Long id;
    private String lastName;

    private String firstName;

    @Column(unique = true)
    private String username;
    private String password;

    @Column(unique = true)
    private String emailAddress;

    private boolean banned;

    private LocalDate joinDate;

    private LocalDate memberTypeChangeDate;
    private LocalDate dateOfRoleEnd;

    private Integer wallet;

    @OneToMany(mappedBy = "mUser",cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH})
    private List<BookLoan> mBookLoans;

    @OneToOne(mappedBy = "mUser",cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH})
    private Fine mFine;

    @OneToMany(mappedBy = "mUser")
    private  List<BookOrder> mBookOrders;


    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role mRole;

    @ManyToOne
    @JoinColumn(name = "memberType_id")
    private MemberType mMemberType;
    private Integer totalBorrowedBookCount;
    private Integer borrowedRareBookCount;
    private Integer borrowedGeneralBookCount;
    private Integer borrowedSpecialBookCount;
    private Integer extraBorrowedRareBookCount;
    private Integer extraBorrowedGeneralBookCount;
    private Integer extraBorrowedSpecialBookCount;

    public User() {
        totalBorrowedBookCount = 0;
        borrowedRareBookCount = 0;
        borrowedGeneralBookCount = 0;
        borrowedSpecialBookCount = 0;
        extraBorrowedRareBookCount = 0;
        extraBorrowedGeneralBookCount = 0;
        extraBorrowedSpecialBookCount = 0;

    }

    public LocalDate getDateOfRoleEnd() {
        return dateOfRoleEnd;
    }

    public void setDateOfRoleEnd(LocalDate dateOfRoleEnd) {
        this.dateOfRoleEnd = dateOfRoleEnd;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public boolean isBanned() {
        return banned;
    }

    public void setBanned(boolean banned) {
        this.banned = banned;
    }

    public LocalDate getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDate joinDate) {
        this.joinDate = joinDate;
    }

    public List<BookLoan> getBookLoans() {
        return mBookLoans;
    }

    public void setBookLoans(List<BookLoan> bookLoans) {
        mBookLoans = bookLoans;
    }

    public Fine getFine() {
        return mFine;
    }

    public void setFine(Fine fine) {
        mFine = fine;
    }

    public List<BookOrder> getBookOrders() {
        return mBookOrders;
    }

    public void setBookOrders(List<BookOrder> bookOrders) {
        mBookOrders = bookOrders;
    }

    public Role getRole() {
        return mRole;
    }

    public void setRole(Role role) {
        mRole = role;
    }

    public Integer getWallet() {
        return wallet;
    }

    public void setWallet(Integer wallet) {
        this.wallet = wallet;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getMemberTypeChangeDate() {
        return memberTypeChangeDate;
    }

    public void setMemberTypeChangeDate(LocalDate roleChangeDate) {
        this.memberTypeChangeDate = roleChangeDate;
    }

    public MemberType getMemberType() {
        return mMemberType;
    }

    public void setMemberType(MemberType memberType) {
        mMemberType = memberType;
    }

    public Integer getTotalBorrowedBookCount() {
        return totalBorrowedBookCount;
    }

    public void setTotalBorrowedBookCount(Integer totalborrowedBookCount) {
        this.totalBorrowedBookCount = totalborrowedBookCount;
    }

    public Integer getBorrowedRareBookCount() {
        return borrowedRareBookCount;
    }

    public void setBorrowedRareBookCount(Integer borrowedRareBookCount) {
        this.borrowedRareBookCount = borrowedRareBookCount;
    }

    public Integer getFreeBorrowedGeneralBookCount() {
        return borrowedGeneralBookCount;
    }

    public void setFreeBorrowedGeneralBookCount(Integer borrowedGeneralBookCount) {
        this.borrowedGeneralBookCount = borrowedGeneralBookCount;
    }

    public Integer getFreeBorrowedSpecialBookCount() {
        return borrowedSpecialBookCount;
    }

    public void setFreeBorrowedSpecialBookCount(Integer borrowedSpecialBookCount) {
        this.borrowedSpecialBookCount = borrowedSpecialBookCount;
    }

    public Integer getExtraBorrowedRareBookCount() {
        return extraBorrowedRareBookCount;
    }

    public void setExtraBorrowedRareBookCount(Integer extraBorrowedRareBookCount) {
        this.extraBorrowedRareBookCount = extraBorrowedRareBookCount;
    }

    public Integer getExtraBorrowedGeneralBookCount() {
        return extraBorrowedGeneralBookCount;
    }

    public void setExtraBorrowedGeneralBookCount(Integer extraBorrowedGeneralBookCount) {
        this.extraBorrowedGeneralBookCount = extraBorrowedGeneralBookCount;
    }

    public Integer getExtraBorrowedSpecialBookCount() {
        return extraBorrowedSpecialBookCount;
    }

    public void setExtraBorrowedSpecialBookCount(Integer extraBorrowedSpecialBookCount) {
        this.extraBorrowedSpecialBookCount = extraBorrowedSpecialBookCount;
    }

    public Integer getBorrowedGeneralBookCount() {
        return borrowedGeneralBookCount;
    }

    public void setBorrowedGeneralBookCount(Integer borrowedGeneralBookCount) {
        this.borrowedGeneralBookCount = borrowedGeneralBookCount;
    }

    public Integer getBorrowedSpecialBookCount() {
        return borrowedSpecialBookCount;
    }

    public void setBorrowedSpecialBookCount(Integer borrowedSpecialBookCount) {
        this.borrowedSpecialBookCount = borrowedSpecialBookCount;
    }

    public static class UserBuilder {
        private User user;

        public UserBuilder() {
            user = new User();
        }

        public UserBuilder(User user) {
            this.user = user;
        }

        public UserBuilder withId(Long id) {
            user.setId(id);
            return this;
        }

        public UserBuilder withLastName(String lastName) {
            user.setLastName(lastName);
            return this;
        }

        public UserBuilder withDateOfRoleEnd(LocalDate localDate) {
            user.setDateOfRoleEnd(localDate);
            return this;
        }

        public UserBuilder withFirstName(String firstName) {
            user.setFirstName(firstName);
            return this;
        }

        public UserBuilder withUsername(String username) {
            user.setUsername(username);
            return this;
        }

        public UserBuilder withPassword(String password) {
            user.setPassword(password);
            return this;
        }

        public UserBuilder withEmailAddress(String emailAddress) {
            user.setEmailAddress(emailAddress);
            return this;
        }

        public UserBuilder withBanned(boolean banned) {
            user.setBanned(banned);
            return this;
        }

        public UserBuilder withJoinDate(LocalDate joinDate) {
            user.setJoinDate(joinDate);
            return this;
        }

        public UserBuilder withRoleChangeDate(LocalDate roleChangeDate) {
            user.setMemberTypeChangeDate(roleChangeDate);
            return this;
        }

        public UserBuilder withWallet(Integer wallet) {
            user.setWallet(wallet);
            return this;
        }

        public UserBuilder withBookLoans(List<BookLoan> bookLoans) {
            user.setBookLoans(bookLoans);
            return this;
        }

        public UserBuilder withFine(Fine fine) {
            user.setFine(fine);
            return this;
        }

        public UserBuilder withBookOrders(List<BookOrder> bookOrders) {
            user.setBookOrders(bookOrders);
            return this;
        }

        public UserBuilder withRole(Role role) {
            user.setRole(role);
            return this;
        }

        public User build() {
            return user;
        }
    }

}
