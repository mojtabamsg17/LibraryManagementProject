package com.example.librarymanagement.dao;

import java.util.List;
public interface GenericDaoCrud<T>{
    void save(T entity);

    T findById(Long id);

    List<T> findAll(Integer page, Integer limit);

    void update(T t);

    void delete(Long id);
}
