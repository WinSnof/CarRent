package com.kulakov.carrent.repository.impl;

import com.kulakov.carrent.models.car.*;
import com.kulakov.carrent.payload.request.NewCarRequest;
import com.kulakov.carrent.repository.CarRepo;
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
public class CarRepoImpl implements CarRepo {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void save(NewCarRequest car) {
        jdbcTemplate.update("INSERT INTO Cars(model, car_type_id, car_brand_id, year, transmission, fuel_type_id, body_type_id, enginevolume, horsepower, fuel_consumption, deposit, car_count, price)" +
                "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                car.getModel(),
                car.getCar_type_id(),
                car.getCar_brand_id(),
                car.getYear(),
                car.getTransmission(),
                car.getFuel_type_id(),
                car.getBody_type_id(),
                car.getEngineVolume(),
                car.getHorsePower(),
                car.getFuelConsumption(),
                car.getDeposit(),
                car.getCarCount(),
                car.getPrice());
    }

    public String getCarTypeById(int id) {
        return jdbcTemplate.queryForObject("SELECT name FROM car_type WHERE id=?", String.class, id);
    }

    public String getCarBrandById(int id) {
        return jdbcTemplate.queryForObject("SELECT name FROM car_brand WHERE id=?", String.class, id);
    }

    public String getCarFuelTypeById(int id) {
        return jdbcTemplate.queryForObject("SELECT name FROM fuel_type WHERE id=?", String.class, id);
    }

    public String getCarBodyTypeById(int id) {
        return jdbcTemplate.queryForObject("SELECT name FROM car_body_type WHERE id=?", String.class, id);
    }

    @Override
    public List<Car> getCars() {
        log.info("cars");
        List<NewCarRequest> carsRaw = jdbcTemplate.query("SELECT * FROM cars",
                new BeanPropertyRowMapper<>(NewCarRequest.class));
        log.info("cars {}", carsRaw);
        List<Car> cars = carsRaw.stream().map(this::buildCarFromRequest)
                .filter(cc -> cc.getCarCount() > 0)
                .collect(Collectors.toList());
        log.info("cars - {}", cars);
        return cars;
    }

    @Override
    public List<Car> getCars(int id) {
        List<NewCarRequest> carsRaw = jdbcTemplate.query("SELECT * FROM cars WHERE car_brand_id=?",
                new BeanPropertyRowMapper<>(NewCarRequest.class), id);
        return carsRaw.stream().map(this::buildCarFromRequest)
                .filter(cc -> cc.getCarCount() > 0)
                .collect(Collectors.toList());
    }

    @Override
    public Car buildCarFromRequest(NewCarRequest car) {
        return new Car(car.getId(),
                car.getModel(),
                getCarTypeById(car.getCar_type_id()),
                getCarBrandById(car.getCar_brand_id()),
                car.getYear(),
                car.getTransmission(),
                getCarFuelTypeById(car.getFuel_type_id()),
                getCarBodyTypeById(car.getBody_type_id()),
                car.getEngineVolume(),
                car.getHorsePower(),
                car.getFuelConsumption(),
                car.getDeposit(),
                car.getCarCount(),
                car.getPrice());
    }

    @Override
    public List<CarFuelType> getCarFuelTypes() {
        return jdbcTemplate.query("SELECT * FROM fuel_type", new BeanPropertyRowMapper<>(CarFuelType.class));
    }

    @Override
    public List<CarClass> getCarClasses() {
        return jdbcTemplate.query("SELECT * FROM car_type", new BeanPropertyRowMapper<>(CarClass.class));
    }

    @Override
    public List<CarBrand> getCarBrands() {
        return jdbcTemplate.query("SELECT * FROM car_brand", new BeanPropertyRowMapper<>(CarBrand.class));
    }

    @Override
    public List<CarBodyType> getCarBodyTypes() {
        return jdbcTemplate.query("SELECT * FROM car_body_type", new BeanPropertyRowMapper<>(CarBodyType.class));
    }

    @Override
    public void addCarBrand(CarBrand brand) {
        jdbcTemplate.update("INSERT INTO car_brand(name) VALUES (?)", brand.getName().toUpperCase());
    }

    @Override
    public boolean isBrandExist(int id) {
        String res = jdbcTemplate.queryForObject("SELECT name FROM car_brand WHERE id=?", String.class, id);
        assert res != null;
        return !res.isEmpty();
    }

    @Override
    public void deleteCarBrandById(int id){
        jdbcTemplate.update("DELETE FROM car_brand WHERE id=?", id);
    }

    @Override
    public boolean isCarBrandExistByName(String name) {
        return Boolean.TRUE.equals(jdbcTemplate.queryForObject("SELECT EXISTS(SELECT * FROM car_brand WHERE name=?)",
                Boolean.class, name.toUpperCase()));
    }

    @Override
    public void deleteCar(Integer id) {
        jdbcTemplate.update("DELETE FROM cars WHERE id=?", id);
    }

    @Override
    public Car getCarById(Integer id) {
        log.info("getCarById - car id is {}", id);
        NewCarRequest raw = jdbcTemplate.query("SELECT * FROM cars WHERE id=?",
                        new BeanPropertyRowMapper<>(NewCarRequest.class), id)
                .stream()
                .findAny()
                .orElse(null);
        return buildCarFromRequest(raw);
    }
}
