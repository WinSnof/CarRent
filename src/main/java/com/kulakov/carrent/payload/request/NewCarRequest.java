package com.kulakov.carrent.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class NewCarRequest {

    private Long id;
    @NotNull(message = "Заполните поле")
    private String model;
    @NotNull(message = "Заполните поле")
    private Integer car_type_id;
    @NotNull(message = "Заполните поле")
    private Integer car_brand_id;
    @NotNull(message = "Заполните поле")
    private Integer year;
    @NotNull(message = "Заполните поле")
    private String transmission;
    @NotNull(message = "Заполните поле")
    private Integer fuel_type_id;
    @NotNull(message = "Заполните поле")
    private Integer body_type_id;
    @NotNull(message = "Заполните поле")
    private Double engineVolume;
    @NotNull(message = "Заполните поле")
    private Integer horsePower;
    @NotNull(message = "Заполните поле")
    private Double fuelConsumption;
    @NotNull(message = "Заполните поле")
    private Double deposit;
    @NotNull(message = "Заполните поле")
    private Integer carCount;
    @NotNull(message = "Заполните поле")
    private Integer price;
}
