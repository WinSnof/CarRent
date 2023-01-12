import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { addBrand, getBrands } from "../../../http/carAPI";
import { Form, Modal, Button } from 'react-bootstrap';
import { Context } from "../../../index";
import { useForm } from 'react-hook-form'

const AddBrand = observer(({ show, onHide }) => {
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
            await addBrand(0, data.brand);
            const newBrandsResponse = await getBrands();
            cars.setBrands(newBrandsResponse);
            onHide(true)
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
            key={1}
        >
            <Modal.Header closeButton>
                <Modal.Title>Добавить бренд</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="d-flex flex-column"
                >
                    <Form.Label className='mt-3'>Имя бренда:
                        <Form.Control
                            {...register('brand', {
                                required: 'Заполните поле.'
                            })}
                            placeholder='Имя бренда'
                            isInvalid={errors?.brand}
                        />
                        <Form.Control.Feedback type='invalid'>{errors?.brand?.message || 'Ошибка'}</Form.Control.Feedback>
                    </Form.Label>
                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={() => onHide(true)}>Закрыть</Button>
                        <Button variant="outline-success" type="submit" disabled={!isValid}>Добавить</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>

        </Modal>
    );
});

export default AddBrand;