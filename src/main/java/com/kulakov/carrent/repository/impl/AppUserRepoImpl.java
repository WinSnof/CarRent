package com.kulakov.carrent.repository.impl;

import com.kulakov.carrent.models.car.Car;
import com.kulakov.carrent.models.carservice.RentRequest;
import com.kulakov.carrent.models.carservice.RentStatus;
import com.kulakov.carrent.models.user.AppUser;
import com.kulakov.carrent.models.user.AppUserProfile;
import com.kulakov.carrent.models.user.Role;
import com.kulakov.carrent.payload.request.ModeratorRentRequest;
import com.kulakov.carrent.payload.request.NewRentRequest;
import com.kulakov.carrent.repository.AppUserRepo;
import com.kulakov.carrent.repository.CarRepo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.time.temporal.ChronoUnit.DAYS;

@Repository
@AllArgsConstructor
@Slf4j
public class AppUserRepoImpl implements AppUserRepo {

    private final JdbcTemplate jdbcTemplate;
    private final CarRepo carRepo;
    @Override
    public Optional<AppUser> findByUsername(String username) {
        Optional<AppUser> user = jdbcTemplate.query("SELECT * FROM Users WHERE username=?",
                new BeanPropertyRowMapper<>(AppUser.class),
                new Object[]{username}).stream().findAny();

        user.get().setRoles(getUserRoles(user.get().getId()));

        return user;
    }

    @Override
    public Optional<AppUser> findByEmail(String email) {
        return jdbcTemplate.query("SELECT * FROM Users WHERE email=?",
                new BeanPropertyRowMapper<>(AppUser.class),
                email).stream().findAny();
    }

    @Override
    public Boolean isExistByUsername(String username) {
        return jdbcTemplate.query("SELECT * FROM Users WHERE username=?",
                new BeanPropertyRowMapper<>(AppUser.class),
                username).stream().findAny().isPresent();
    }

    @Override
    public Boolean isExistByEmail(String email) {
        return jdbcTemplate.query("SELECT * FROM Users WHERE email=?",
                new BeanPropertyRowMapper<>(AppUser.class),
                new Object[]{email}).stream().findAny().isPresent();
    }

    @Override
    public AppUser save(AppUser user, int roleId) {
        Long id = jdbcTemplate.queryForObject("insert into users (username, email, password) values(?, ?, ?) RETURNING id",
                Long.class,
                user.getUsername(),
                user.getEmail(),
                user.getPassword());
        jdbcTemplate.update("INSERT INTO user_roles(user_id, role_id) VALUES (?,?)", id, roleId);
        user.setId(id);
        user.setRoles(getUserRoles(id));
        return user;
    }

    @Override
    public void deleteUser(Long id) {
        jdbcTemplate.update("DELETE FROM users WHERE id=?", id);
    }

    @Override
    public boolean findById(Long id) {
        return Boolean.TRUE.equals(jdbcTemplate.queryForObject("SELECT EXISTS(SELECT * FROM users WHERE id=?)", Boolean.class, id));
    }

    @Override
    public void setUserProfileInfo(AppUserProfile user) {
        jdbcTemplate.update("INSERT INTO user_profile(id, first_name, last_name, patronymic, passport_serial, passport_number, date_of_birth,phone_number) \n" +
                "values(?,?,?,?,?,?,?,?)",
                user.getId(),
                user.getFirst_name(),
                user.getLast_name(),
                user.getPatronymic(),
                user.getPassportSerial(),
                user.getPassportNumber(),
                user.getDateOfBirth(),
                user.getPhone_number());
    }

    @Override
    public void updateUserProfileInfo(AppUserProfile user) {
        jdbcTemplate.update("UPDATE user_profile SET first_name=?, last_name=?, patronymic=?, passport_serial=?, passport_number=?, date_of_birth=?, phone_number =? WHERE id=?",
                user.getFirst_name(),
                user.getLast_name(),
                user.getPatronymic(),
                user.getPassportSerial(),
                user.getPassportNumber(),
                user.getDateOfBirth(),
                user.getPhone_number(),
                user.getId());
    }

    @Override
    public boolean isUserLoginInFirstTime(Long userId) {
        return Boolean.TRUE.equals(jdbcTemplate.queryForObject("SELECT EXISTS(SELECT * FROM user_profile WHERE id=?)", Boolean.class, userId));
    }

    @Override
    public AppUserProfile getUserInfo(Long userId) {
        return jdbcTemplate.query("SELECT * FROM user_profile WHERE id=?",
                new BeanPropertyRowMapper<>(AppUserProfile.class), userId).stream().findAny().orElse(null);
    }

    @Override
    public void addRentRequest(NewRentRequest request, int carCount) {
        LocalDate date = LocalDate.now();
        if(date.isAfter(request.getStartDate())) {
            throw new RuntimeException("Невозможно оформить машину на заднее число.");
        }
        long daysBetween = DAYS.between(request.getStartDate(), request.getEndDate());
        if(daysBetween < 0 || daysBetween == 0) {
            throw new RuntimeException("Ошибка на стороне клиента. Машину можно оформить только на один день и более.");
        }

        Integer carPrice = jdbcTemplate.queryForObject("SELECT price " +
                        "FROM cars " +
                        "WHERE id=?",
                Integer.class,
                request.getCarId());
        Long totalPrice = daysBetween * carPrice;

        jdbcTemplate.update("UPDATE cars SET car_count=? WHERE id=?", --carCount,request.getCarId());


        jdbcTemplate.update("INSERT INTO rent_requests(user_id, car_id, start_date, end_date, price, status) " +
                "VALUES (?,?,?,?,?,?)",
                request.getUserId(),
                request.getCarId(),
                request.getStartDate(),
                request.getEndDate(),
                totalPrice,
                RentStatus.NEW.name());
    }

    @Override
    public List<ModeratorRentRequest> getNewRentRequests() {
        List<RentRequest> raw = jdbcTemplate.query("SELECT * FROM rent_requests WHERE status=?",
                new BeanPropertyRowMapper<>(RentRequest.class),
                RentStatus.NEW.name());
        return raw.stream()
                .map(this::buildModeratorRequestFromRentRequest)
                .collect(Collectors.toList());
    }

    @Override
    public void cancelRentById(Long id) {
        int carId = jdbcTemplate.queryForObject("SELECT car_id FROM rent_requests WHERE id=?",
                Integer.class,
                id);
        int carCount = jdbcTemplate.queryForObject("SELECT car_count FROM cars WHERE id=?",
                Integer.class,
                carId);
        jdbcTemplate.update("UPDATE cars SET car_count=? WHERE id=?", ++carCount, carId);
        jdbcTemplate.update("UPDATE rent_requests SET status=? WHERE id=?",
                RentStatus.CANCELED.name(),
                id);
    }

    @Override
    public void completeRentById(Long id) {
        int carId = jdbcTemplate.queryForObject("SELECT car_id FROM rent_requests WHERE id=?",
                Integer.class,
                id);
        int carCount = jdbcTemplate.queryForObject("SELECT car_count FROM cars WHERE id=?",
                Integer.class,
                carId);
        jdbcTemplate.update("UPDATE cars SET car_count=? WHERE id=?", ++carCount, carId);
        jdbcTemplate.update("UPDATE rent_requests SET status=? WHERE id=?",
                RentStatus.COMPLETED.name(),
                id);
    }

    @Override
    public Integer getCarCount(int id) {
        return jdbcTemplate.queryForObject("SELECT car_count FROM cars WHERE id=?",Integer.class,id);
    }

    private ModeratorRentRequest buildModeratorRequestFromRentRequest(RentRequest request) {
        ModeratorRentRequest res = new ModeratorRentRequest();
        AppUserProfile info = jdbcTemplate.query("SELECT * FROM user_profile WHERE id=?",
                new BeanPropertyRowMapper<>(AppUserProfile.class),
                request.getUserId()).stream().findAny().orElse(null);
        AppUser user = jdbcTemplate.query("SELECT * FROM users WHERE id=?",
                new BeanPropertyRowMapper<>(AppUser.class),
                request.getUserId())
                .stream().findAny().orElse(null);
        Car car = carRepo.getCarById(request.getCarId());
        res.setFio(String.format("%s %s %s",
                info.getLast_name(),
                info.getFirst_name(),
                info.getPatronymic()));
        res.setEmail(user.getEmail());
        res.setPhone(info.getPhone_number());
        res.setCarInfo(String.format("%s %s. Год выпуска : %d; Трансмиссия: %s",
                car.getBrand(),
                car.getModel(),
                car.getYear(),
                car.getTransmission()));
        res.setStartDate(request.getStartDate());
        res.setEndDate(request.getEndDate());
        res.setDeposit(car.getDeposit());
        res.setPrice(request.getPrice());
        res.setId(request.getId());
        return res;
    }

    @Override
    public List<AppUser> getUsers() {
        List<AppUser> users = jdbcTemplate.query("SELECT * FROM users", new BeanPropertyRowMapper<>(AppUser.class));
        for(AppUser user : users) {
            user.setRoles(getUserRoles(user.getId()));
        }
        return users;
    }

    private List<Role> getUserRoles(Long id) {
        List<String> rolesRaw =
                (jdbcTemplate.queryForList("SELECT name FROM roles INNER JOIN user_roles ON roles.id=user_roles.role_id WHERE user_roles.user_id=?",
                String.class,
                id));
        return rolesRaw.stream().map(Role::valueOf).collect(Collectors.toList());
    }


}
