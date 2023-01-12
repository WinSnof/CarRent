import { useContext } from "react";
import { Container, Image, Form, Card } from "react-bootstrap";
import { Context } from "../../../index";

const ProfileAccount = () => {

    const { user } = useContext(Context);

    return (
        <Container
            className="d-flex justify-content-between mt-5"
            style={{ height: window.innerHeight + 54 }}
        >
            <Card
                className="p-3"
                style={{ width: 800, height: 600 }}
            >
                <Image className="mx-auto d-block p-1 m-1" roundedCircle="true" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeVxENTQsYrCTb8KRDfizMDGw1y3K4nINQLsKHwJynPg&s" style={{ width: 150, height: 150 }} />
                <h2 className="m-auto">Профиль</h2>
                <Form className="d-flex flex-column p-3 m-3">
                    <Form.Label>Имя пользователя</Form.Label>
                    <Form.Control
                        disabled
                        placeholder={user.user.username}
                    />
                    <Form.Label className="mt-3">Email</Form.Label>
                    <Form.Control
                        disabled
                        placeholder={user.user.email}
                    />
                    <Form.Label className="mt-3">Пароль</Form.Label>
                    <Form.Control
                        disabled
                        type="password"
                        placeholder="Пароль"
                    />

                </Form>
            </Card>
        </Container>
    );
}

export default ProfileAccount;