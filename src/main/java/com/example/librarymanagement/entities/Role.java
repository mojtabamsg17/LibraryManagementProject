package com.example.librarymanagement.entities;


import com.example.librarymanagement.entities.entity.EntityInterface;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

@Entity
@Table(name = "role_finallibrary")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Role  implements EntityInterface {
    @Id
    @SequenceGenerator(name = "finalLibraryRole_sequence", sequenceName = "roleSequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "finalLibraryRole_sequence")
    private Long id;

    @Column(unique = true)
    private String roleName;

    public Role() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

//    public List<User> getUserList() {
//        return mUserList;
//    }
//
//    public void setUserList(List<User> userList) {
//        mUserList = userList;
//    }

    public static void main(String[] args) {

    }

}
