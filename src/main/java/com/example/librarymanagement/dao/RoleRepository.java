package com.example.librarymanagement.dao;


import com.example.librarymanagement.entities.Role;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

@Repository
public class RoleRepository {
    private final EntityManager mManager;

    public RoleRepository(EntityManager manager) {
        mManager = manager;
    }


    public Role findRoleByName(String roleName) {
        Query query = mManager.createQuery("select o from Role o where o.roleName =: roleName");
        query.setParameter("roleName", roleName);
        Role role = (Role) query.getSingleResult();
        return role;
    }
}
