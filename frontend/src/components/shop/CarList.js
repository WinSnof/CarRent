import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Row } from "react-bootstrap";
import { Context } from "../..";
import { getCars } from "../../http/carAPI";
import CarItem from "./CarItem";

const CarList = observer(() => {

    const { cars } = useContext(Context);

    useEffect(() => {
        getCars().then(data => cars.setCars(data))
    },[cars]);


    return (
        <Row className="d-flex">
            {
                    cars.cars.map((car) => <CarItem car={car} key={car.id} />)
            }

        </Row>
    );
});

export default CarList;