package com.kulakov.carrent.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ModeratorRentRequest {
    private Long id;
    private String fio;
    private String email;
    private String phone;
    private String carInfo;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double deposit;
    private Integer price;
}
