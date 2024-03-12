package com.example.librarymanagement.dao;

import com.example.librarymanagement.entities.entity.EntityInterface;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.Query;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Scope("prototype")
public class GenericDaoCrudImpl<T extends EntityInterface> implements GenericDaoCrud<T> {
    private Class<T> classType;
    private final EntityManager entityManager;

    public GenericDaoCrudImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void setClassType(Class<T> classType) {
        this.classType = classType;
    }

    @Override
    public void save(T entity) {
        entityManager.persist(entity);
    }

    @Override
    public T findById(Long id) {
        T t = entityManager.find(classType, id);
        if (t == null)
            throw new EntityNotFoundException();
        else
            return t;
    }

//    @Override
//    public List<T> findAll(Integer page, Integer limit) {
////            CriteriaBuilder cb = entityManager.getCriteriaBuilder();
////            CriteriaQuery<T> query = cb.createQuery(classType);
////            Root<T> food = query.from(classType);
////
////            TypedQuery<T> q = entityManager.createQuery(query);
////
////            q.setFirstResult((page - 1) * limit+1);
////            q.setMaxResults(limit);
////            return q.getResultList();
//
//        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
//        CriteriaQuery<T> query = cb.createQuery(classType);
//        Root<T> food = query.from(classType);
//
//        CriteriaQuery<T> selectQuery = query.select(food);
//        Subquery<Long> subquery = query.subquery(Long.class);
//        Root<T> subfood = subquery.from(classType);
//        subquery.select(cb.count(subfood));
//
//        Query countQuery = entityManager.createQuery(String.valueOf(subquery));
//        Long totalCount = (Long) countQuery.getSingleResult();
//
//        int totalPages = (int) Math.ceil((double) totalCount / limit);
//        int offset = (page - 1) * limit;
//        if (offset >= totalCount) {
//            page = totalPages;
//            offset = (page - 1) * limit;
//        }
//
//        TypedQuery<T> q = entityManager.createQuery(selectQuery);
//        q.setFirstResult(offset);
//        q.setMaxResults(limit);
//        return q.getResultList();
//
//    }

    @Override
    public List<T> findAll(Integer page, Integer limit) {
        Query query = entityManager.createQuery("from " + classType.getName(), classType);
//        Query query = entityManager.createQuery("select b from Book b", Book.class);
        query.setFirstResult(((page) * limit));
        query.setMaxResults(limit);
        List<T> list = query.getResultList();
        return list;
    }


    public List<T> findAll() {
        Query query = entityManager.createQuery("from " + classType.getName(), classType);
        List<T> list = query.getResultList();
        return list;
    }


    @Override
    public void update(T t) {
        this.findById(t.getId());
        entityManager.merge(t);
//        entityManager.flush();
    }

    @Override
    public void delete(Long id) {
        entityManager.remove(this.findById(id));
    }


}
