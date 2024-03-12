package com.example.librarymanagement.entities;

import com.example.librarymanagement.entities.entity.EntityInterface;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "booktype_finallibrary")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class BookType implements EntityInterface {
    @Id
    @SequenceGenerator(name = "finalLibraryBook_sequence", sequenceName = "bookSequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "finalLibraryBook_sequence")
    private Long id;

    @Column(unique = true)
    private String typeName;

    @OneToMany(mappedBy = "mBookType")
    private List<RoleBookTypeSetting> mRoleBookTypeSettings;


    public BookType() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

}

