package com.kulakov.carrent.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class NewRentRequest {
    private Long userId;
    private Integer carId;
    private LocalDate startDate;
    private LocalDate endDate;
}
