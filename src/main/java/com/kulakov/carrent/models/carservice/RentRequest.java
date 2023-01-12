package com.kulakov.carrent.models.carservice;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RentRequest {
    private Long id;
    private Long userId;
    private Integer carId;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer price;
    private RentStatus status;
}
