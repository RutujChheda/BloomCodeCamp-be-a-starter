//package com.hcc.controllers;
//
//import com.hcc.entities.User;
//import com.hcc.services.UserService;
//import com.hcc.dto.UserRegistrationRequest;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/auth")
//public class UserController {
//
//    @Autowired
//    private UserService userService;
//
//    @PostMapping("/register")
//    public ResponseEntity<String> register(@RequestBody UserRegistrationRequest request) {
//        userService.registerUser(request);
//        return ResponseEntity.ok("User registered successfully");
//    }
//}