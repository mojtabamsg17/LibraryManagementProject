package com.example.librarymanagement.entities;

import com.example.librarymanagement.entities.entity.EntityInterface;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

@Entity
@Table(name = "fine_finallibrary")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Fine implements EntityInterface {
    @Id
    @SequenceGenerator(name = "finalLibraryFine_sequence", sequenceName = "fineSequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "finalLibraryFine_sequence")
    private Long id;

    private Double mFineAmount;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User mUser;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getFineAmount() {
        return mFineAmount;
    }

    public void setFineAmount(Double fineAmount) {
        mFineAmount = fineAmount;
    }

    public User getUser() {
        return mUser;
    }

    public void setUser(User user) {
        mUser = user;
    }
}
