import { Modal, Form, Button } from 'react-bootstrap'
import { rentRequest } from '../../../http/userAPI';
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react';
import { Context } from '../../..';
import { getCars } from '../../../http/carAPI';
import { observer } from 'mobx-react-lite';

const RentCar = observer(({ show, onHide, item, userId }) => {

    const [start, setStart] = useState(0)
    const [days, setDays] = useState(0)
    const {cars} = useContext(Context);

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
            await rentRequest(userId, item.car.id, data.start, data.end);
             
            reset();
            onHide(true)
        } catch (e) {
            alert(e);
        }
        onHide(true);
    }

    const validateStart = (value) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const now = new Date(value);
        setStart(now)
        return now >= today && now.getFullYear() === today.getFullYear();
    };

    const validateEnd = (value) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const now = new Date(value);
        setDays(now.getDate() - start.getDate())
        return now > today && now.getFullYear() === today.getFullYear() && now > start;
    };

    const updateCars = async() => {
        const response = await getCars();
        cars.setCars(response);
        onHide(true);
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            key={1}
        >
            <Modal.Header closeButton>
                <Modal.Title>Арендовать авто</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="d-flex flex-column"
                >
                    <Form.Label className='mt-3'>
                        Хочу арендовать с:
                        <Form.Control
                            type="date"
                            {...register('start', {
                                required: 'Заполните поле',
                                validate: validateStart
                            })}
                            isInvalid={errors?.start}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.start?.message || 'Нельзя оформлять на заднее число, а так же на год вперед.'}</Form.Control.Feedback>
                    </Form.Label>
                    <Form.Label className='mt-3'>
                        По:
                        <Form.Control
                            type="date"
                            {...register('end', {
                                required: 'Заполните поле',
                                validate: validateEnd
                            })}
                            isInvalid={errors?.end}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.end?.message || 'Нельзя оформлять на заднее число, на год вперед и менее чем на 1 день.'}</Form.Control.Feedback>
                    </Form.Label>
                    <span>
                        Залог: {item.car.deposit} <br />
                        Стоимость аренды в сутки: {item.car.price} <br />
                        Итоговая стоимость: {days > 0 ? days * item.car.price : 0}<br />
                    </span>
                    <Modal.Footer>
                        <Button
                            variant="outline-danger"
                            onClick={() => onHide(true)}
                        >
                            Закрыть
                        </Button>
                        <Button
                            disabled={!isValid}
                            type='submit'
                            variant="outline-success"
                            onClick={() => updateCars()}
                        >
                            Оставить заявку
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
});

export default RentCar;