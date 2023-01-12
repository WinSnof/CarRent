package com.kulakov.carrent.rest;

import com.kulakov.carrent.payload.request.ModeratorRentRequest;
import com.kulakov.carrent.payload.response.MessageResponse;
import com.kulakov.carrent.repository.AppUserRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/moderator")
@CrossOrigin
@AllArgsConstructor
public class ModeratorController {

    private final AppUserRepo userRepo;

    @GetMapping("/new/rents-requests")
    @PreAuthorize("hasRole('MODERATOR')")
    public List<ModeratorRentRequest> getNewRentRequests() {
        return userRepo.getNewRentRequests();
    }

    @PutMapping("/cancel-request/{id}")
    @PreAuthorize("hasRole('MODERATOR')")
    public ResponseEntity<?> cancelRentRequest(@PathVariable("id") Long id) {
        userRepo.cancelRentById(id);
        return ResponseEntity.ok(new MessageResponse("Заявка успешно отменена."));
    }

    @PutMapping("/complete-request/{id}")
    @PreAuthorize("hasRole('MODERATOR')")
    public ResponseEntity<?> completeRentRequest(@PathVariable("id") Long id) {
        userRepo.completeRentById(id);
        return ResponseEntity.ok(new MessageResponse("Заявка успешно завершена."));
    }

}
