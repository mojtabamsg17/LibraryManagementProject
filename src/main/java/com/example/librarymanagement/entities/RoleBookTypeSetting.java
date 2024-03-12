package com.example.librarymanagement.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class RoleBookTypeSetting {

    @Id
    @SequenceGenerator(name = "finalLibraryRoleBookType_sequence", sequenceName = "RoleBookTypeSequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "finalLibraryRoleBookType_sequence")
    private Long id;
    private Integer maxBorrowed;
    private Integer freeBorrowed;
    private Integer extraBorrowed;

    @ManyToOne
    @JsonBackReference("mRole")
    private Role mRole;

    @ManyToOne
    @JsonBackReference("mBookType")
    private BookType mBookType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMaxBorrowed() {
        return maxBorrowed;
    }

    public void setMaxBorrowed(Integer maxBorrowed) {
        this.maxBorrowed = maxBorrowed;
    }

    public Integer getFreeBorrowed() {
        return freeBorrowed;
    }

    public void setFreeBorrowed(Integer freeBorrowed) {
        this.freeBorrowed = freeBorrowed;
    }

    public Integer getExtraBorrowed() {
        return extraBorrowed;
    }

    public void setExtraBorrowed(Integer extraBorrowed) {
        this.extraBorrowed = extraBorrowed;
    }

    public Role getRole() {
        return mRole;
    }

    public void setRole(Role role) {
        mRole = role;
    }

    public BookType getBookType() {
        return mBookType;
    }

    public void setBookType(BookType bookType) {
        mBookType = bookType;
    }
}
