package com.kulakov.carrent.repository;

import com.kulakov.carrent.models.car.*;
import com.kulakov.carrent.models.carservice.RentRequest;
import com.kulakov.carrent.payload.request.NewCarRequest;

import java.util.List;

public interface CarRepo {
    void save(NewCarRequest car);
    List<CarFuelType> getCarFuelTypes();
    List<CarClass> getCarClasses();
    List<CarBrand> getCarBrands();
    List<CarBodyType> getCarBodyTypes();

    String getCarTypeById(int id);

    String getCarBrandById(int id);

    String getCarFuelTypeById(int id);

    String getCarBodyTypeById(int id);

    List<Car> getCars();
    List<Car> getCars(int id);

    Car buildCarFromRequest(NewCarRequest car);

    void addCarBrand(CarBrand brand);


    boolean isBrandExist(int id);

    void deleteCarBrandById(int id);

    boolean isCarBrandExistByName(String name);

    void deleteCar(Integer id);

    Car getCarById(Integer id);

}
