package com.example.librarymanagement.services;


import com.example.librarymanagement.dao.GenericDaoCrudImpl;
import com.example.librarymanagement.dao.RoleRepository;
import com.example.librarymanagement.entities.Role;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RoleService {
    private final GenericDaoCrudImpl<Role> roleDao;
    private final RoleRepository roleRepository;


    public RoleService(GenericDaoCrudImpl<Role> roleDao, RoleRepository roleRepository) {
        this.roleDao = roleDao;
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    public void init() {
        roleDao.setClassType(Role.class);
    }

    @Transactional
    public void save(Role role) {
         roleDao.save(role);
    }

    public Role findById(Long id){
        return roleDao.findById(id);
    }

    public List<Role> findAll(Integer page, Integer limit){
        return roleDao.findAll(page, limit);
    }

    @Transactional
    public void delete(Long id) {
        roleDao.delete(id);
    }

    @Transactional
    public void update(Role role){
        roleDao.update(role);
    }

    public Role findRoleByName(String roleName) {
        return roleRepository.findRoleByName(roleName);
    }
}
