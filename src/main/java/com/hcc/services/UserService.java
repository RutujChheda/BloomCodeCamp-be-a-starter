package com.hcc.services;

import com.hcc.entities.Authority;
import com.hcc.entities.User;
import com.hcc.enums.AuthorityEnum;
import com.hcc.repositories.UserRepository;
import com.hcc.utils.CustomPasswordEncoder;
import com.hcc.dto.UserRegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomPasswordEncoder passwordEncoder;

    public void registerUser(UserRegistrationRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new UsernameNotFoundException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.getPasswordEncoder().encode(request.getPassword()));
        user.setAuthorities(Collections.singletonList(new Authority(AuthorityEnum.Authority.ROLE_LEARNER.name(), user)));
        user.setCohortStartDate(LocalDate.now());
        userRepository.save(user);
    }
}