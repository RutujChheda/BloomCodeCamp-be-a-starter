package com.hcc.controllers;

import com.hcc.enums.AuthorityEnum;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/reviewer")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewerController {

    @GetMapping
    @PreAuthorize("hasAuthority(T(com.hcc.enums.AuthorityEnum.Authority).ROLE_CODE_REVIEWER.name())")
    public String testHomeForReviewer() {
        return "You're at the reviewer route.";
    }
}