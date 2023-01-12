package com.kulakov.carrent.payload.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;

@Data
public class SignUpRequest {

    @NotEmpty(message = "Имя пользователя не должно быть пустым.")
    private String username;
    @NotEmpty(message = "Email не должен быть пустым.")
    @Email(message = "Не верный формат Email")
    private String email;
    @NotEmpty(message = "Пароль не должен быть пустым.")
    private String password;
    private List<String> roles = new ArrayList<>();
}
