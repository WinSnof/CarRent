package com.kulakov.carrent.services;

import com.kulakov.carrent.models.car.*;
import com.kulakov.carrent.payload.request.NewCarRequest;
import com.kulakov.carrent.repository.CarRepo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class CarService {

    private final CarRepo carRepo;

    public void saveCar(NewCarRequest car){
        carRepo.save(car);
    }

    public List<Car> getCars() {
        return carRepo.getCars();
    }

    public List<Car> getCars(int id) {
        return carRepo.getCars(id);
    }

    public List<CarFuelType> getFuelTypes() {
        return carRepo.getCarFuelTypes();
    }

    public List<CarBodyType> getCarBodyTypes() {
        return carRepo.getCarBodyTypes();
    }

    public List<CarClass> getCarClasses() {
        return carRepo.getCarClasses();
    }

    public List<CarBrand> getCarBrands() {
        return carRepo.getCarBrands();
    }

    public boolean isCarBrandExistByName(String name) {
        return carRepo.isCarBrandExistByName(name);
    }

    public void addCarBrand(CarBrand brand) {
        carRepo.addCarBrand(brand);
    }

    public boolean isBrandExist(int id) {
        return carRepo.isBrandExist(id);
    }

    public void deleteBrandById(int id) {
        carRepo.deleteCarBrandById(id);
    }

    public void deleteCarById(Integer id) {
        carRepo.deleteCar(id);
    }

}
