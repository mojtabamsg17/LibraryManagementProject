package com.example.librarymanagement.controllers;
import com.example.librarymanagement.entities.Role;
import com.example.librarymanagement.services.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/findAll/{page}/{limit}")
    public List<Role> getAllRoles(@PathVariable("page") Integer page,
                                  @PathVariable("limit") Integer limit) {
        return roleService.findAll(page, limit);
    }

    @GetMapping("/{id}")
    public Role getRoleById(@PathVariable("id") Long id) {
        return roleService.findById(id);
    }

    @PostMapping("/save")
    public void createRole(@RequestBody Role role) {
        roleService.save(role);
    }

    @PutMapping("/update")
    public void updateRole(@RequestBody Role role) {
        roleService.update(role);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteRole(@PathVariable("id") Long id) {
        roleService.delete(id);
    }
}