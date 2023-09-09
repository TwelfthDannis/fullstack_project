package com.example.back.controller;
import com.example.back.Authentication.AuthenticationResponse;
import com.example.back.Authentication.SignInRequest;
import com.example.back.Authentication.SignUpRequest;
import com.example.back.model.Product;
import com.example.back.model.User;
import com.example.back.repository.ProductRepository;
import com.example.back.repository.UserRepository;
import com.example.back.service.AuthenticationService;
import com.example.back.util.JwtTokenUtils;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@CrossOrigin
public class IdentityController {

    private final AuthenticationService authenticationService;
    private final JwtTokenUtils jwtTokenUtils;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @PostMapping("identity/register")
    public AuthenticationResponse login(@RequestBody SignUpRequest signUpRequest) {
        return authenticationService.signUp(signUpRequest);
    }

    @PostMapping("identity/login")
    public AuthenticationResponse login(@RequestBody SignInRequest signInRequest, HttpServletResponse httpServletResponse) {
        return authenticationService.signIn(signInRequest,httpServletResponse);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> profile(@RequestHeader("Authorization") String token) {
        if (jwtTokenUtils.extractUsername(token) == null ){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }else {
            return ResponseEntity.ok(userRepository.findByEmail(jwtTokenUtils.extractUsername(token)));
        }
    }
    @PostMapping("/product/add")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productRepository.save(product));
    }
    @PostMapping("/")
    public ResponseEntity<?> BuyShoes(@RequestBody String nike,@RequestHeader("Authorization") String token) {
        System.out.println(token);
        return ResponseEntity.ok(nike);
    }

}
