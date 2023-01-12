package com.kulakov.carrent.models.car;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Car {
    private Long id;
    private String model;
    private String carType; //класс авто
    private String brand; //бренд авто
    private Integer year;
    private String transmission;
    private String fuelType; //тип топлива авто
    private String bodyType; //кузов
    private Double engineVolume;
    private Integer horsePower;
    private Double fuelConsumption;
    private Double deposit;
    private Integer carCount;
    private Integer price;
}
