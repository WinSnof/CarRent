import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Card, Col, Button, Image } from "react-bootstrap";
import { Context } from "../..";
import { deleteCar, getCars } from "../../http/carAPI";
import RentCar from "./modals/RentCar";

const CarItem = observer((car) => {

    const { user } = useContext(Context);
    const { cars } = useContext(Context);
    const [rentCarVisible, setRentCarVisible] = useState(false);

    const DeleteCar = async () => {
        try {
            await deleteCar(car.car.id);
            cars.setCars(await getCars());
        } catch (e) {
            alert(e);
        }
    }

    return (
        <Col md={9} key={car.car.id}>
            <Card className="mb-5">
                <Card.Body>
                    <Card.Title>{car.car.brand + " " + car.car.model}</Card.Title>
                    <Card.Text className="d-flex d-space-beetween">
                        <Image width={150} height={150} src="https://cdn-icons-png.flaticon.com/512/1085/1085961.png" />
                        <Card.Text className="ms-5">
                            <span>
                                <b>Характеристики</b><br /><br />
                                Год производства: {car.car.year} <br />
                                Трансмиссия: {car.car.transmission} <br />
                                Объем двигателя: {car.car.engineVolume} <br />
                                Лошадиных сил: {car.car.horsePower} <br />
                                Расход топлива: {car.car.fuelConsumption} <br />
                            </span>
                        </Card.Text>
                        <Card.Text className="ms-5">
                            <br /><br />
                            Класс машины: {car.car.carType}<br />
                            Брэнд: {car.car.brand}<br />
                            Тип топлива: {car.car.fuelType}<br />
                            Тип кузова: {car.car.bodyType} <br />
                        </Card.Text>
                    </Card.Text>
                    <Card.Text className="d-flex">
                        Депозит: {car.car.deposit}  Цена в сутки: {car.car.price}<br />
                        Колличество: {car.car.carCount}

                        <Button
                            variant="primary"
                            className="ms-auto"
                            onClick={() =>
                                user.userInfo.first_name != null ?
                                    setRentCarVisible(true)
                                    :
                                    alert('Сначала нужно заполнить профиль.')}>
                            Бронировать
                        </Button>
                        <RentCar show={rentCarVisible} onHide={() => setRentCarVisible(false)} item={car} userId={user.user.id} />
                    </Card.Text>
                    {
                        user.user.roles.find((role) => role === "ROLE_ADMIN") &&
                        <span className="d-flex ms-auto">
                            <Button disabled={true} className="ms-auto" variant="primary">Редактировать</Button>
                            <Button className="ms-3" variant="danger" onClick={() => DeleteCar()}>Удалить</Button>
                        </span>
                    }
                </Card.Body>
            </Card>
        </Col>
    );
})

export default CarItem;