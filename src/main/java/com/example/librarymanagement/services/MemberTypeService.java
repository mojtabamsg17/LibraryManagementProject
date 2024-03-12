package com.example.librarymanagement.services;

import com.example.librarymanagement.dao.GenericDaoCrudImpl;
import com.example.librarymanagement.entities.MemberType;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MemberTypeService {
    private final GenericDaoCrudImpl<MemberType> memberTypeDao;

    public MemberTypeService(GenericDaoCrudImpl<MemberType> memberTypeDao) {
        this.memberTypeDao = memberTypeDao;
    }

    @PostConstruct
    public void init() {
        memberTypeDao.setClassType(MemberType.class);
    }

    @Transactional
    public void save(MemberType memberType) {
         memberTypeDao.save(memberType);
    }

    public MemberType findById(Long id){
        return memberTypeDao.findById(id);
    }

    public List<MemberType> findAll(Integer page, Integer limit){
        return memberTypeDao.findAll(page, limit);
    }

    @Transactional
    public void delete(Long id) {
        memberTypeDao.delete(id);
    }

    @Transactional
    public void update(MemberType memberType){
        memberTypeDao.update(memberType);
    }
}
