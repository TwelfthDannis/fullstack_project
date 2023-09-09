package com.example.back.service;

import com.example.back.Authentication.AuthenticationResponse;
import com.example.back.Authentication.SignInRequest;
import com.example.back.Authentication.SignUpRequest;
import com.example.back.model.Role;
import com.example.back.repository.UserRepository;
import com.example.back.util.JwtTokenUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.back.model.User;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final JwtTokenUtils jwtTokenUtils;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse signUp(SignUpRequest signUpRequest) {
        var user = User
                .builder()
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .firstName(signUpRequest.getFirstName())
                .lastName(signUpRequest.getLastName())
                .role(Role.ROLE_USER)
                .build();
        user=userService.save(user);
        var token=jwtTokenUtils.generateToken(user);
        var refreshToken=jwtTokenUtils.generateRefreshToken(user);
        return AuthenticationResponse.builder().token(token).refreshToken(refreshToken).build();
    }

    public AuthenticationResponse signIn(SignInRequest signInRequest, HttpServletResponse response){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getEmail(),signInRequest.getPassword()));
        var user=userRepository.findByEmail(signInRequest.getEmail()).orElseThrow(()-> new RuntimeException("User not found"));
        var token=jwtTokenUtils.generateToken(user);
        var refreshToken=jwtTokenUtils.generateRefreshToken(user);
        Cookie cookie=new Cookie("refreshToken",token);
        cookie.setMaxAge(60);
        response.addCookie(cookie);
        return AuthenticationResponse.builder().token(token).refreshToken(refreshToken).build();
    }

}
