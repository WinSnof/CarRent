package com.kulakov.carrent.repository;

import com.kulakov.carrent.payload.response.AppRoleResponse;

import java.util.List;

public interface AppRoleRepo {
    void addUserRole(Integer role, Long userId);
    List<String> getUserRoles(Long id);
    List<AppRoleResponse> getRoles();

    boolean isUserHaveRole(Integer role, Long id);

    void deleteRoleFromUser(Integer roleId, Long userId);
}
