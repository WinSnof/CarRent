package com.kulakov.carrent.payload.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class LogInRequest {
    @NotEmpty(message = "Имя пользователя не должно быть пустым.")
    private String username;
    @NotEmpty(message = "Пароль не должен быть пустым.")
    private String password;
}
