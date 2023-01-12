import React from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import { registration } from '../../http/userAPI';
import { LOGIN_ROUTE } from '../../utils/Paths';
import { useForm } from 'react-hook-form'

const RegistrationForm = () => {
    
    //Валидация
    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset
    } = useForm({
        mode: 'onBlur'
    });

    const onSubmit = async (data) => {
        //Отправка запроса на регестрацию
        try {
            const response = await registration(data.username, data.email, data.password);
            alert(response.message);
        } catch (e) {
            alert(e.response.data.message)
        }
        reset();
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card className="p-3" style={{ width: 600 }}>
                <h2 className="m-auto">Регистрация</h2>
                <Form className="d-flex flex-column p-3 m-3" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Label className="mt-3">
                        Имя пользователя:
                        <Form.Control
                            {...register('username', {
                                required: 'Введите имя пользователя.',
                                minLength: {
                                    value: 5,
                                    message: 'Имя пользователя должно содержать хотя бы 5 символов.'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Имя пользователя не должно содержать более 21 символа.'
                                }
                            })}
                            placeholder="Имя пользователя"
                            isInvalid={errors?.username}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.username?.message || 'Ошибка'}</Form.Control.Feedback>
                    </Form.Label>
                    <Form.Label className="mt-3">
                        Email:
                        <Form.Control
                            {...register('email', {
                                required: 'Введите email.',
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Не верный формат email.'
                                }
                            })}
                            type='email'
                            placeholder="Email"
                            isInvalid={errors?.email}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.email?.message || 'Ошибка'}</Form.Control.Feedback>
                    </Form.Label>
                    <Form.Label className="mt-3">
                        Пароль:
                        <Form.Control
                            {...register('password', {
                                required: 'Введите пароль.',
                                minLength: {
                                    value: 5,
                                    message: 'Пароль должен содержать минимум 5 символа.'
                                },
                                maxLength: {
                                    value: 18,
                                    message: 'Пароль не должен превышать 18 символов.'
                                }
                            })}
                            type="password"
                            placeholder="Пароль"
                            isInvalid={errors?.password}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.password?.message || 'Ошибка'}</Form.Control.Feedback>
                    </Form.Label>
                    <Button
                        disabled={!isValid}
                        className="mt-3"
                        variant="outline-success"
                        value="Зарегестрироваться"
                        type="submit"
                        as="input"
                    />
                    <div className="mt-3">Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink></div>
                </Form>
            </Card>
        </Container>
    );
}

export default RegistrationForm;