package com.kulakov.carrent.models.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppUserProfile {
    private Long id;
    private String first_name;
    private String last_name;
    private String patronymic;
    private Integer passportSerial;
    private Integer passportNumber;
    private LocalDate dateOfBirth;
    private String phone_number;
}
