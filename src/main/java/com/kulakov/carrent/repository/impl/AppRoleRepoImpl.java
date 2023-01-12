package com.kulakov.carrent.repository.impl;

import com.kulakov.carrent.models.user.AppRole;
import com.kulakov.carrent.models.user.Role;
import com.kulakov.carrent.payload.response.AppRoleResponse;
import com.kulakov.carrent.repository.AppRoleRepo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Repository
@Slf4j
public class AppRoleRepoImpl implements AppRoleRepo {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public List<String> getUserRoles(Long id) {
        List<String> rolesRaw =
                (jdbcTemplate.queryForList("SELECT name FROM roles INNER JOIN user_roles ON roles.id=user_roles.role_id WHERE user_roles.user_id=?",
                        String.class,
                        id));
        return rolesRaw;
    }

    @Override
    public List<AppRoleResponse> getRoles() {
        List<AppRoleResponse> res = jdbcTemplate.query("SELECT * FROM roles",
                new BeanPropertyRowMapper<>(AppRoleResponse.class));
        return res;
    }

    @Override
    public boolean isUserHaveRole(Integer roleId, Long userId) {
        return jdbcTemplate.queryForObject("SELECT EXISTS(SELECT * FROM user_roles WHERE role_id=? AND user_id=?)", Boolean.class, roleId, userId);
    }

    @Override
    public void deleteRoleFromUser(Integer roleId, Long userId) {
        jdbcTemplate.update("DELETE FROM user_roles WHERE user_id=? AND role_id=?", userId, roleId);
    }

    @Override
    public void addUserRole(Integer roleId, Long userId) {
        jdbcTemplate.update("INSERT INTO user_roles(user_id, role_id) VALUES(?,?)", userId, roleId);
    }

}
