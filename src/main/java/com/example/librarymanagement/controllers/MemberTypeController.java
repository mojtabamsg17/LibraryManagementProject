package com.example.librarymanagement.controllers;


import com.example.librarymanagement.entities.MemberType;
import com.example.librarymanagement.services.MemberTypeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/memberType")
public class MemberTypeController {

    private final MemberTypeService memberTypeService;

    public MemberTypeController(MemberTypeService memberTypeService) {
        this.memberTypeService = memberTypeService;
    }

    @GetMapping("/findAll/{page}/{limit}")
    public List<MemberType> getAllMemberTypes(@PathVariable("page") Integer page,
                                              @PathVariable("limit") Integer limit) {
        return memberTypeService.findAll(page, limit);
    }

    @GetMapping("/{id}")
    public MemberType getMemberTypeById(@PathVariable("id") Long id) {
        return memberTypeService.findById(id);
    }

    @PostMapping("/save")
    public void createMemberType(@RequestBody MemberType memberType) {
        memberTypeService.save(memberType);
    }

    @PutMapping("/update")
    public void updateMemberType(@RequestBody MemberType memberType) {
        memberTypeService.update(memberType);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMemberType(@PathVariable("id") Long id) {
        memberTypeService.delete(id);
    }
}