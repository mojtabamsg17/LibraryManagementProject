package com.example.librarymanagement.dao;

import com.example.librarymanagement.entities.MemberType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

@Repository
public class MemberTypeRepository {
    private final EntityManager mManager;

    public MemberTypeRepository(EntityManager manager) {
        mManager = manager;
    }


    public MemberType findRoleByName(String memberTypeName) {
        Query query = mManager.createQuery("select o from MemberType o where o.memberTypeName =: memberTypeName");
        query.setParameter("memberTypeName", memberTypeName);
        MemberType memberType = (MemberType) query.getSingleResult();
        return memberType;
    }
}
