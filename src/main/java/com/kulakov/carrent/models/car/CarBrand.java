package com.kulakov.carrent.models.car;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CarBrand {
    private Long id;
    @NotEmpty(message = "Заполните поле.")
    private String name;
}
