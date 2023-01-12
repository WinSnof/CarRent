import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addCar, getCars } from '../../../http/carAPI';
import { Context } from "../../../index";
import { useForm } from 'react-hook-form'

const AddCar = observer(({ show, onHide }) => {

    //Глобальный стейт машин
    const { cars } = useContext(Context);

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
        try {
            await addCar(0, 
                data.model, 
                data.class, 
                data.brand, 
                data.year, 
                data.trans, 
                data.fuel, 
                data.body, 
                data.volume, 
                data.horses, 
                data.consum, 
                data.depo, 
                data.count, 
                data.price);
            cars.setCars(await getCars());
            onHide(true);
        } catch (e) {
            alert(e.response.data.message);
        }
        onHide(true);
        reset();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            key={567}
        >
            <Modal.Header closeButton>
                <Modal.Title>Добавить машину</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">

                    <Form.Label>
                        Модель машины:
                        <Form.Control
                            {...register('model', {
                                required: 'Заполните поле.'
                            })}
                            placeholder='Модель'
                            isInvalid={errors?.model}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.model?.message}</Form.Control.Feedback>
                    </Form.Label>

                    <Form.Label className='mt-3'>
                        Класс машины:
                        <Form.Select
                            {...register('class', {
                                value: (e) => e.target.value,
                                required: true
                            })}
                            isInvalid={errors?.class}
                        >
                            {cars.carClasses.map((type) => <option value={type.id}>{type.name}</option>)}
                        </Form.Select>
                    </Form.Label>

                    <Form.Label className='mt-3'>
                        Тип кузова:
                        <Form.Select
                            {...register('body', {
                                value: (e) => e.target.value,
                                required: true
                            })}
                            isInvalid={errors?.body}
                        >
                            {cars.bodyTypes.map((type) => <option value={type.id}>{type.name}</option>)}
                        </Form.Select>
                    </Form.Label>

                    <Form.Label className='mt-3'>
                        Год производства
                        <Form.Control
                            placeholder='Год производства'
                            {...register('year', {
                                required: 'Заполните поле.',
                                min: {
                                    value: 2001,
                                    message: 'Год не может быть меньше 2000.'
                                },
                                max: {
                                    value: 2022,
                                    message: 'Год не может быть больше 2022'
                                }
                            })}
                            isInvalid={errors?.year?.message}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.year?.message}</Form.Control.Feedback>
                    </Form.Label>

                    <Form.Label className='mt-3'>
                        Трансмиссия:
                        <Form.Select
                            {...register('trans', {
                                value: (e) => e.target.value,
                                required: true
                            })}
                            isInvalid={errors?.trans}
                        >
                            <option key={1}>Автомат</option>
                            <option key={2}>Полуавтомат</option>
                            <option key={3}>Механика</option>
                        </Form.Select>
                    </Form.Label>

                    <Form.Label className='mt-3'>
                        Тип топлива:
                        <Form.Select
                            {...register('fuel', {
                                value: (e) => e.target.value,
                                required: true
                            })}
                            isInvalid={errors?.fuel}
                        >
                            {cars.fuelTypes.map((type) => <option value={type.id}>{type.name}</option>)}
                        </Form.Select>
                    </Form.Label>

                    <Form.Label className='mt-3'>
                        Бренд:
                        <Form.Select
                            {...register('brand', {
                                value: (e) => e.target.value,
                                required: true
                            })}
                            isInvalid={errors?.brand}
                        >
                            {cars.brands.map((type) => <option value={type.id}>{type.name}</option>)}
                        </Form.Select>
                    </Form.Label>
                    <Form.Label className='mt-3'>
                        Объем двигателя
                        <Form.Control
                            type="number"
                            step="0.1"
                            placeholder='Объем двигателя'
                            {...register('volume', {
                                required: 'Заполните поле.',
                                min: {
                                    value: 1,
                                    message: 'Объем двигателя не может быть меньше нуля.'
                                }
                            })}
                            isInvalid={errors?.volume}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.volume?.message}</Form.Control.Feedback>
                    </Form.Label>
                    <Form.Label className='mt-3'>
                        Лошадиных сил
                        <Form.Control
                            type="number"
                            {...register('horses', {
                                required: 'Заполните поле.',
                                min: {
                                    value: 1,
                                    message: 'Не может быть меньше нуля.'
                                }
                            })}
                            isInvalid={errors?.horses}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.horses?.message}</Form.Control.Feedback>
                    </Form.Label>
                    <Form.Label className='mt-3'>
                        Расход топлива
                        <Form.Control
                            type="number"
                            step="0.1"
                            placeholder='Расход топлива'
                            {...register('consum', {
                                required: 'Заполните поле.',
                                min: {
                                    value: 1,
                                    message: 'Расход топлива не может быть меньше нуля.'
                                }
                            })}
                            isInvalid={errors?.consum}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.consum?.message}</Form.Control.Feedback>
                    </Form.Label>
                    <Form.Label className='mt-3'>
                        Депозит
                        <Form.Control
                            type="number"
                            placeholder='Депозит'
                            {...register('depo', {
                                required: 'Заполните поле.',
                                min: {
                                    value: 1000,
                                    message: 'Депозит не может быть меньше 1000.'
                                }
                            })}
                            isInvalid={errors?.depo}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.depo?.message}</Form.Control.Feedback>
                    </Form.Label>

                    <Form.Label className='mt-3'>
                        Колличество
                        <Form.Control
                            type="number"
                            placeholder='Колличество'
                            {...register('count', {
                                required: 'Заполните поле.',
                                min: {
                                    value: 1,
                                    message: 'Машин не может быть меньше нуля.'
                                }
                            })}
                            isInvalid={errors?.count}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.count?.message}</Form.Control.Feedback>
                    </Form.Label>

                    <Form.Label className='mt-3'>
                        Цена в сутки
                        <Form.Control
                            type="number"
                            placeholder='Цена в сутки'
                            {...register('price', {
                                required: 'Заполните поле.',
                                min: {
                                    value: 500,
                                    message: 'Не может быть меньше 500'
                                }
                            })}
                            isInvalid={errors?.price}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.price?.message}</Form.Control.Feedback>
                    </Form.Label>
                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={() => onHide(true)}>Закрыть</Button>
                        <Button variant="outline-success" type='submit' disabled={!isValid}>Добавить</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal >
    );
});

export default AddCar;