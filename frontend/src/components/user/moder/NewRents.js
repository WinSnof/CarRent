import { useEffect, useState } from "react";
import { Button, Container, Table, Form } from "react-bootstrap"
import { cancelRent, completeRent, getNewRentRequests } from "../../../http/userAPI";


const NewRents = () => {
    const [requests, setRequests] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getNewRentRequests().then(data => setRequests(data))
    }, []);

    const filtered = requests.filter(rent => {
        return rent.fio.toLowerCase().includes(search.toLowerCase());
    })

    const complete = async (id) => {
        try {
            const response = await completeRent(id);
            alert(response.message);
        } catch (e) {
            alert(e)
        }
    }

    const cancel = async (id) => {
        try {
            const response = await cancelRent(id);
            alert(response.message);
        } catch (e) {
            alert(e)
        }
    }

    return (
        <Container>
            <Form className="d-flex mb-3 mt-3 m-auto">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={e => setSearch(e.target.value)}
                />
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Ф.И.О</th>
                        <th>Email</th>
                        <th>Номер телефона</th>
                        <th>Машина</th>
                        <th>Дата с:</th>
                        <th>Дата по:</th>
                        <th>Залог</th>
                        <th>К оплате</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filtered.map((req) =>
                            <tr>
                                <td>{req.id}</td>
                                <td>{req.fio}</td>
                                <td>{req.email}</td>
                                <td>{req.phone}</td>
                                <td>{req.carInfo}</td>
                                <td>{req.startDate}</td>
                                <td>{req.endDate}</td>
                                <td>{req.deposit}</td>
                                <td>{req.price}</td>
                                <td className="d-flex m-auto">
                                    <Button
                                        variant="outline-success"
                                        onClick={() => complete(req.id)}
                                    >
                                        Готово
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => cancel(req.id)}
                                    >
                                        Отменить
                                    </Button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </Container>
    );
}

export default NewRents;