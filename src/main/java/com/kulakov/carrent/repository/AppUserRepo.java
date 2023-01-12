package com.kulakov.carrent.repository;

import com.kulakov.carrent.models.carservice.RentRequest;
import com.kulakov.carrent.models.user.AppUser;
import com.kulakov.carrent.models.user.AppUserProfile;
import com.kulakov.carrent.payload.request.ModeratorRentRequest;
import com.kulakov.carrent.payload.request.NewRentRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface AppUserRepo {
    Optional<AppUser> findByUsername(String username);
    Optional<AppUser> findByEmail(String email);
    Boolean isExistByUsername(String username);
    Boolean isExistByEmail(String email);
    List<AppUser> getUsers();

    AppUser save(AppUser user,int roleId);

    void deleteUser(Long id);

    boolean findById(Long id);

    //Профиль
    void setUserProfileInfo(AppUserProfile user);
    void updateUserProfileInfo(AppUserProfile user);

    boolean isUserLoginInFirstTime(Long userId);

    AppUserProfile getUserInfo(Long userId);

    void addRentRequest(NewRentRequest request, int carCount);

    List<ModeratorRentRequest> getNewRentRequests();

    void cancelRentById(Long id);
    void completeRentById(Long id);

    Integer getCarCount(int id);
}
