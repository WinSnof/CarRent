import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { getUserInfo, setUserInfo } from "../../../http/userAPI";
import { Context } from "../../../index";
import { useForm } from 'react-hook-form'

const ProfileData = observer(() => {

    const { user } = useContext(Context);
    
    useEffect(() => {
        getUserInfo(user.user.id).then(data => user.setUserInfo(data))
    },[user]);

    //Валидация
    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit
    } = useForm({
        mode: 'onBlur'
    });

    const validateDate = (value) => {
        const selected = new Date(value).getFullYear();
        const now = new Date().getFullYear();
        return now - selected >= 18;
    };


    const onSubmit = async (data) => {
        try {
            const response = await setUserInfo(
                user.user.id,
                data.firstname,
                data.lastname,
                data.patronymic,
                data.serial,
                data.number,
                data.date,
                data.phone);
            user.setUserInfo(await getUserInfo(user.user.id));
            alert(response)
        } catch (e) {
            alert(e)
        }
    }

    console.log(user.userInfo)

    return (
        <Container
            className="d-flex justify-content-between mt-5"
            style={{ height: window.innerHeight + 54 }}
        >
            <Card
                className="p-3"
                style={{ width: 800 }}
            >
                <h2 className="m-auto">Данные пользователя</h2>
                <Form className="d-flex flex-column p-3 m-3">
                    <Form.Label>Имя: {user.userInfo.first_name}</Form.Label>
                    <Form.Label>Фамиля: {user.userInfo.last_name}</Form.Label>
                    <Form.Label>Отчество: {user.userInfo.patronymic}</Form.Label>
                    <Form.Label>Пасспортные данные: {user.userInfo.passportSerial} {user.userInfo.passportNumber}</Form.Label>
                    <Form.Label>Дата рождения: {user.userInfo.dateOfBirth}</Form.Label>
                    <Form.Label>Номер телефона: {user.userInfo.phone_number}</Form.Label>
                </Form>
                <Form className="d-flex flex-column p-3 m-3" onSubmit={handleSubmit(onSubmit)}>

                    <Form.Label className="mt-3">
                        Имя
                        <Form.Control
                            {...register('firstname', {
                                required: 'Заполните поле.',
                                pattern: {
                                    value: /^[a-zA-Zа-яА-Я]+$/ui,
                                    message: 'Имя должно состоять только из букв латинского/русского алфавита.'
                                }
                            })}
                            placeholder='Имя'
                            isInvalid={errors?.firstname}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.firstname?.message}</Form.Control.Feedback>
                    </Form.Label>
                    <Form.Label className="mt-3">
                        Фамилия
                        <Form.Control
                            {...register('lastname', {
                                required: 'Заполните поле.',
                                pattern: {
                                    value: /^[a-zA-Zа-яА-Я]+$/ui,
                                    message: 'Фамилия должна состоять только из букв латинского/русского алфавита.'
                                }
                            })}
                            placeholder='Фамилия'
                            isInvalid={errors?.lastname}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.lastname?.message}</Form.Control.Feedback>
                    </Form.Label>
                    <Form.Label className="mt-3">
                        Отчество
                        <Form.Control
                            {...register('patronymic', {
                                required: 'Заполните поле.',
                                pattern: {
                                    value: /^[a-zA-Zа-яА-Я]+$/ui,
                                    message: 'Отчество должно состоять только из букв латинского/русского алфавита.'
                                }
                            })}
                            placeholder='Отчество'
                            isInvalid={errors?.patronymic}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.patronymic?.message}</Form.Control.Feedback>
                    </Form.Label>
                    <Form.Label className="mt-3">
                        Серия паспорта
                        <Form.Control
                            {...register('serial', {
                                required: 'Заполните поле.',
                                pattern: {
                                    value: /[0-9]{4}/,
                                    message: 'Не правильный формат.'
                                },
                                maxLength: {
                                    value: 4,
                                    message: 'Серия паспорта должна состоять из 4 цифр.'
                                }
                            })}
                            placeholder="Серия"
                            isInvalid={errors?.serial}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.serial?.message}</Form.Control.Feedback>
                    </Form.Label>
                    <Form.Label className="mt-3">
                        Номер паспорта
                        <Form.Control
                            {...register('number', {
                                required: 'Заполните поле.',
                                pattern: {
                                    value: /[0-9]{6}/,
                                    message: 'Не правильный формат.'
                                },
                                maxLength: {
                                    value: 6,
                                    message: 'Номер паспорта должен содержать 6 цифр.'
                                }
                            })}
                            placeholder="Номер"
                            isInvalid={errors?.number}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.number?.message}</Form.Control.Feedback>
                    </Form.Label>
                    <Form.Label className="mt-3">
                        Дата рождения
                        <Form.Control
                            {...register('date', {
                                required: 'Заполните поле.',
                                validate: validateDate
                            })}
                            type="date"
                            isInvalid={errors?.date}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.date?.message || 'Для использования нашего сервиса Вам должно быть минимум 18 лет.'}</Form.Control.Feedback>
                    </Form.Label>
                    <Form.Label className="mt-3">
                        Номер телефона:
                        <Form.Control
                            {...register('phone', {
                                required: 'Заполните поле.',
                                pattern: {
                                    value: /^(\+7|7|8)?[s-]?\(?[489][0-9]{2}\)?[s-]?[0-9]{3}[s-]?[0-9]{2}[s-]?[0-9]{2}$/,
                                    message: 'Не верный формат.'
                                }
                            })}
                            isInvalid={errors?.phone}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.phone?.message || 'Заполните поле что бы мы могли с вами связаться.'}</Form.Control.Feedback>
                    </Form.Label>
                    <Button
                        disabled={!isValid}
                        className="mt-3"
                        variant="outline-success"
                        value="Сохранить"
                        type="submit"
                        as="input"
                    />
                </Form>
            </Card>
        </Container>
    );
});

export default ProfileData;