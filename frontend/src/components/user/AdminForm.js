import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Context } from '../../index';
import { deleteUser, getUsers } from '../../http/userAPI';
import UserRoles from './modals/UserRoles';

export const AdminForm = observer(() => {

    const [addRoleVisible, setAddRoleVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(0);
    const [isDelete, setIsDelete] = useState(false);
    const [search, setSearch] = useState('');
    const { user } = useContext(Context);

    useEffect(() => {
        getUsers().then(data => user.setUsersList(data))
    }, [user])


    const addRole = (id) => {
        setIsDelete(false);
        setSelectedUser(id);
        setAddRoleVisible(true);
    }

    const deleteRole = (id) => {
        setIsDelete(true);
        setSelectedUser(id);
        setAddRoleVisible(true);
    }

    const deleteFunc = async (id) => {
        try {
            await deleteUser(id);
            user.setUsersList(await getUsers());
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    const filter = user.usersList.filter(user => {
        return user.username.toLowerCase().includes(search.toLowerCase());
    })

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
                        <th>Username</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Управление ролями</th>
                        <th>Удалить пользователя</th>
                    </tr>
                </thead>
                <tbody>
                    {filter.map((us) =>
                        <tr key={us.id}>
                            <td>{us.id}</td>
                            <td>{us.username}</td>
                            <td>{us.email}</td>
                            <td>{us.roles.join(',')}</td>
                            <td>
                                <Button
                                    onClick={() => addRole(us.id)}
                                >Добавить роль
                                </Button>
                                <Button
                                    className='ms-3'
                                    onClick={() => deleteRole(us.id)}
                                >Удалить роль
                                </Button>
                            </td>
                            <td><Button variant='outline-danger' onClick={() => deleteFunc(us.id)}>Удалить</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <UserRoles show={addRoleVisible} onHide={() => setAddRoleVisible(false)} userId={selectedUser} isDelete={isDelete} />
        </Container>
    );
})