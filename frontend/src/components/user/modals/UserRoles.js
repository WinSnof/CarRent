import { useContext, useEffect, useState } from 'react';
import { addRolesToUser, deleteRolesFromUser, getRoles, getUsers } from '../../../http/userAPI';
import { Form, Modal, Button } from 'react-bootstrap';
import { Context } from '../../../index';

const UserRoles = ({ show, onHide, userId, isDelete }) => {

    const [roles, setRoles] = useState([]);
    const [selected, setSelected] = useState(1);
    const{user} = useContext(Context);

    useEffect(() => {
        getRoles().then(data => setRoles(data))
    }, []);

    const addRoleFunc = async () => {
        try {
            await addRolesToUser(userId, selected);
            user.setUsersList(await getUsers());
            onHide(true);
        } catch(e) {
            alert(e.response.data.message)
        }
    }

    const deleteRoleFunc = async () => {
        try {
            await deleteRolesFromUser(userId, selected);
            user.setUsersList(await getUsers());
            onHide(true);
        } catch(e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            key={'user_roles'}
        >
            <Modal.Header closeButton>
                <Modal.Title>{isDelete ? 'Удалить':'Добавить'} роль</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Select className='mt-3' onChange={(e) => setSelected(e.target.value)}>
                        {
                            roles.map(({id, name}) => <option  key={id} value={id}>{name}</option>)
                        }
                    </Form.Select>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-danger" onClick={() => onHide(true)}>Закрыть</Button>
                <Button variant="outline-success" onClick={() => isDelete ? deleteRoleFunc() : addRoleFunc()}>{isDelete ? 'удалить' : 'добавить'}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UserRoles;