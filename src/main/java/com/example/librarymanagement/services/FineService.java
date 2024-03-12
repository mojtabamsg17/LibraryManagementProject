package com.example.librarymanagement.services;

import com.example.librarymanagement.dao.GenericDaoCrudImpl;
import com.example.librarymanagement.entities.Fine;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FineService {
    private final GenericDaoCrudImpl<Fine> fineDao;

    public FineService(GenericDaoCrudImpl<Fine> fineDao) {
        this.fineDao = fineDao;
    }

    @PostConstruct
    public void init() {
        fineDao.setClassType(Fine.class);
    }

    @Transactional
    public void save(Fine fine) {
         fineDao.save(fine);
    }

    public Fine findById(Long id){
        return fineDao.findById(id);
    }

//    public List<Fine> findAll(page, limit){
//        return fineDao.findAll(page, limit);
//    }

    @Transactional
    public void delete(Long id) {
        fineDao.delete(id);
    }

    @Transactional
    public void update(Fine fine){
        fineDao.update(fine);
    }

    }
