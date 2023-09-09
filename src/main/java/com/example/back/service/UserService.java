package com.example.back.service;

import com.example.back.model.User;
import com.example.back.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User save(User newUser) {
        if (userRepository.findByEmail(newUser.getEmail()).isEmpty()) {
        return userRepository.save(newUser);
        }else {
            return null;
        }
    }
}
