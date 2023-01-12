package com.kulakov.carrent.rest;

import com.kulakov.carrent.models.car.*;
import com.kulakov.carrent.payload.request.NewCarRequest;
import com.kulakov.carrent.payload.response.MessageResponse;
import com.kulakov.carrent.services.CarService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/cars")
@AllArgsConstructor
@CrossOrigin
@Slf4j
public class CarController {

    private final CarService carService;

    //Получение машин
    @GetMapping("/get-all")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<Car> getCars() {
        return carService.getCars();
    }

    //Получение машин по бренду
    @GetMapping("/get-all/{id}")
    public List<Car> getCarsByBrand(@PathVariable(name = "id") int id) {
        return carService.getCars(id);
    }

    //Добавление новой машины
    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addCar(@RequestBody @Valid NewCarRequest car) {
        log.info("Add car - {}",car);
        carService.saveCar(car);
        return ResponseEntity.ok().body("Новая машина успешно добавлена");
    }

    //Получение подтаблиц машины
    @GetMapping("/fuels")
    public List<CarFuelType>  getFuelTypes() {
        return carService.getFuelTypes();
    }

    @GetMapping("/body-types")
    public List<CarBodyType>  getCarBodyTypes() {
        return carService.getCarBodyTypes();
    }

    @GetMapping("/car-classes")
    public List<CarClass>  getCarClasses() {
        return carService.getCarClasses();
    }

    @GetMapping("/brands")
    public List<CarBrand>  getCarBrands() {
        return carService.getCarBrands();
    }

    //Добавление нового бренда
    @PostMapping("/brands")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addCarBrand(@RequestBody @Valid CarBrand brand) {
        if(carService.isCarBrandExistByName(brand.getName())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Такой бренд уже существует!"));
        }
        carService.addCarBrand(brand);
        return ResponseEntity.ok("Новый бренд добавлен");
    }

    //Удаление бренда
    @DeleteMapping("/brands/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteCarBrand(@PathVariable("id") Integer id) {
        log.info("{}", id);
        if(!carService.isBrandExist(id)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Брэнд не существует!"));
        }
        carService.deleteBrandById(id);
        return ResponseEntity.ok("Брэнд успешно удален");
    }

    //Удаление машины
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteCar(@PathVariable("id") Integer id){
        carService.deleteCarById(id);
        return ResponseEntity.ok("Машина удалена");
    }

}
