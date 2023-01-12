package com.kulakov.carrent.rest;

import com.kulakov.carrent.models.user.AppUser;
import com.kulakov.carrent.payload.response.AppRoleResponse;
import com.kulakov.carrent.payload.response.MessageResponse;
import com.kulakov.carrent.repository.AppRoleRepo;
import com.kulakov.carrent.repository.AppUserRepo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@AllArgsConstructor
@CrossOrigin
@Slf4j
public class AdminController {

    private AppUserRepo userRepository;
    private AppRoleRepo roleRepo;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<AppUser> getAllUsers() {
        return userRepository.getUsers();
    }

    @GetMapping("/roles")
    @PreAuthorize("hasRole('ADMIN')")
    public List<AppRoleResponse> getRoles() {
        return roleRepo.getRoles();
    }

    @GetMapping("/roles/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public List<String> getUserRoles(@PathVariable("id") Long id) {
        return roleRepo.getUserRoles(id);
    }

    @PostMapping("/role/{user_id}/{role_id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addRoleToUser(@PathVariable("user_id") Long userId, @PathVariable("role_id") Integer roleId) {
        log.info("user id {} role id {}", userId, roleId);
        if(roleRepo.isUserHaveRole(roleId, userId)) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: такая роль уже есть у пользователя"));
        }
        roleRepo.addUserRole(roleId, userId);
        return ResponseEntity.ok("Роль успешно добавлена");
    }

    @DeleteMapping("/role/{user_id}/{role_id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteRoleFromUser(@PathVariable("user_id") Long userId, @PathVariable("role_id") Integer roleId) {
        if(!roleRepo.isUserHaveRole(roleId, userId)) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: такой роли нет у пользователя."));
        }
        if(roleRepo.getUserRoles(userId).size() == 1) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: у пользователя должна быть оставаться хотя бы 1 роль."));
        }
        roleRepo.deleteRoleFromUser(roleId, userId);
        return ResponseEntity.ok("Роль успешно удалена.");
    }

    @DeleteMapping("/user/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        if(!userRepository.findById(id)) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Такого пользователя не существует"));
        }
        userRepository.deleteUser(id);
        return ResponseEntity.ok("Пользователь успешно удален");
    }

}
