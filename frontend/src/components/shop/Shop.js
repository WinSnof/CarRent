import { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { Button, Col, Container, Row } from "react-bootstrap";
import Brands from "./Brands";
import CarList from "./CarList";
import AddCar from "./modals/AddCar";
import AddBrand from "./modals/AddBrand";
import { getBodyTypes, getCarClasses, getFuelTypes } from "../../http/carAPI";
import { observer } from "mobx-react-lite";
import { getUserInfo } from "../../http/userAPI";

const Shop = observer(() => {
    const { user } = useContext(Context);
    const { cars } = useContext(Context);

    useEffect(() => {
        getCarClasses().then(data => cars.setClasses(data))
        getFuelTypes().then(data => cars.setFuelTypes(data))
        getBodyTypes().then(data => cars.setBodyTypes(data))
        getUserInfo(user.user.id).then(data => user.setUserInfo(data))
    }, [cars,user])
    console.log(user.userInfo)

    const [addCarVisible, setAddCarVisible] = useState(false);
    const [addBrandVisible, setAddBrandVisible] = useState(false);

    return (
        <Container className="mt-5">
            <Row>
                <Col md={3}>
                    <Brands />
                    {
                        user.user.roles.find((role) => role === "ROLE_ADMIN") && <Button className="mt-3" onClick={() => setAddBrandVisible(true)}>Добавить бренд</Button>
                    }
                </Col>
                <Col md={9}>
                    {
                        user.user.roles.find((role) => role === "ROLE_ADMIN") && <Button className="mb-3" onClick={() => setAddCarVisible(true)}>Добавить машину</Button>
                    }
                    <CarList />
                </Col>
            </Row>
            <AddCar show={addCarVisible} onHide={() => setAddCarVisible(false)} />
            <AddBrand show={addBrandVisible} onHide={() => setAddBrandVisible(false)}/>
        </Container>
    );
})

export default Shop;