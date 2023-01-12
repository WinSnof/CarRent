import React, { useContext } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap'
import { CAR_LIST_ROUTE, REGISTATION_ROUTE } from '../../utils/Paths';
import { NavLink, useNavigate } from "react-router-dom";
import { getUserInfo, login } from '../../http/userAPI';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form'

const LoginForm = observer(() => {

    const navigate = useNavigate();

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

    //Глобальный пользователь
    const { user } = useContext(Context);

    const onSubmit = async (data) => {
        //Отправка запроса на вход
        try {
            const response = await login(data.login, data.password);
            //Прокидываем стетй в мобх
            user.setIsAuth(true);
            user.setUser(response);
            user.setUserInfo(await getUserInfo(user.user.id));
            navigate(CAR_LIST_ROUTE);
        } catch (e) {
            alert(e.response.data.error);
        }
        reset();
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card className="p-3" style={{ width: 600 }}>
                <h2 className="m-auto">Войти</h2>

                <Form className="d-flex flex-column p-3 m-3" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Label className="mt-3">Имя пользователя:
                        <Form.Control
                            {...register('login', {
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
                            isInvalid={errors?.login}
                        />
                        <Form.Control.Feedback type="invalid">{errors?.login?.message || 'Ошибка'}</Form.Control.Feedback>
                    </Form.Label>
                    <Form.Label className="mt-3">
                        Пароль:
                        <Form.Control
                            {...register('password', {
                                required: 'Введите пароль.'
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
                        value="Login"
                        type="submit"
                        as="input"
                    />
                    <span className="mt-3">Новый пользователь? <NavLink to={REGISTATION_ROUTE}>Зарегестрироваться</NavLink></span>
                </Form>
            </Card>
        </Container>
    );
})

export default LoginForm;