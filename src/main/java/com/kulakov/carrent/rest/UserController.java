package com.kulakov.carrent.rest;

import com.kulakov.carrent.models.user.AppUserProfile;
import com.kulakov.carrent.payload.request.NewRentRequest;
import com.kulakov.carrent.payload.response.MessageResponse;
import com.kulakov.carrent.repository.AppUserRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profile")
@CrossOrigin
@AllArgsConstructor
public class UserController {

    private final AppUserRepo userRepo;

    @PostMapping("/add-info")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> addInfo(@RequestBody AppUserProfile user) {
        if(userRepo.isUserLoginInFirstTime(user.getId())) {
            userRepo.updateUserProfileInfo(user);
            return ResponseEntity.ok("Данные успешно обновлены");
        }
        userRepo.setUserProfileInfo(user);
        return ResponseEntity.ok("Данные успешно добавлены");
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public AppUserProfile getUserData(@PathVariable("id") Long userId) {
        if(!userRepo.isUserLoginInFirstTime(userId)) {
            return new AppUserProfile();
        }
        return userRepo.getUserInfo(userId);
    }

    @PostMapping("/rent-car")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> userRentRequest(@RequestBody NewRentRequest request) {
        int carCount = userRepo.getCarCount(request.getCarId());
        if(carCount == 0) {
            return  ResponseEntity.badRequest().body(new MessageResponse("Данных машин пока нет в наличии."));
        }
        userRepo.addRentRequest(request,carCount);
        return ResponseEntity.ok("Все ок.");
    }
}
