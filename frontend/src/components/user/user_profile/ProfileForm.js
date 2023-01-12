import React from "react";
import { Row, Col, Nav, Tab , Card} from 'react-bootstrap'
import ProfileAccount from "./ProfileAccount";
import ProfileData from "./ProfileData";

export const ProfileForm = () => {


    return (
        <Tab.Container className="mt-5" defaultActiveKey="first" style={{ height: window.innerHeight + 54 }}>
            <Row>
                <Col sm={3}>
                    <Card className="mt-5 ms-5">
                        <Nav variant="pills" className="flex-column" >
                            <Nav.Item>
                                <Nav.Link eventKey="first">Учетная запись</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Данные пользователя</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <ProfileAccount />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <ProfileData />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}