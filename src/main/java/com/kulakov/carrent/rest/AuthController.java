package com.kulakov.carrent.rest;

import com.kulakov.carrent.models.user.AppUser;
import com.kulakov.carrent.models.user.Role;
import com.kulakov.carrent.payload.request.LogInRequest;
import com.kulakov.carrent.payload.request.SignUpRequest;
import com.kulakov.carrent.payload.request.Token;
import com.kulakov.carrent.payload.response.JwtResponse;
import com.kulakov.carrent.payload.response.MessageResponse;
import com.kulakov.carrent.repository.AppUserRepo;

import com.kulakov.carrent.security.jwt.JwtTokenProvider;
import com.kulakov.carrent.security.services.UserDetailsImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/auth")
@Slf4j
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AppUserRepo userRepository;
    private final PasswordEncoder encoder;
    private final JwtTokenProvider jwtTokenProvider;
    private String userJWT;
    private UserDetailsImpl details;

    public AuthController(AuthenticationManager authenticationManager,
                          AppUserRepo userRepository,
                          PasswordEncoder encoder,
                          JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    //Регистрация нового пользователя
    @PostMapping("/signup")
    public ResponseEntity<?> signUn(@RequestBody @Valid SignUpRequest request) {
        if(userRepository.isExistByEmail(request.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Данный email занят!"));
        }
        if(userRepository.isExistByUsername(request.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Данное имя пользователя занято!"));
        }

        AppUser user = new AppUser(request.getUsername(),request.getEmail(),encoder.encode(request.getPassword()));

        List<String> userRoles = request.getRoles();
        List<Role> roles = new ArrayList<>();
        if(userRoles == null) {
            roles.add(Role.ROLE_USER); //тест
        }

        user.setRoles(roles);
        userRepository.save(user,1);
        return ResponseEntity.ok(new MessageResponse("Вы успешно зарегестрировались!"));
    }

    //Вход
    @PostMapping("/signing")
    public ResponseEntity<?> signIn(@RequestBody @Valid LogInRequest request){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtTokenProvider.generate(authentication);
        userJWT = jwt;

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        details = userDetails;
        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/check")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> checkJWT(@RequestBody Token token) {
        log.info("token {}" , userJWT);
        if(!token.getJwt().equals(userJWT)) {
            return ResponseEntity.badRequest().body("User JWT token expired.");
        } else {
            List<String> roles = details.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());
            JwtResponse res = new JwtResponse(
                    token.getJwt(),
                    details.getId(),
                    details.getUsername(),
                    details.getEmail(),
                    roles);
            return ResponseEntity.ok(res);
        }
    }

}
