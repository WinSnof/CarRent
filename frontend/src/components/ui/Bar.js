import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import { Context } from '../..';
import { ADMIN_ROUTE, CAR_LIST_ROUTE, HOME_ROUTE, LOGIN_ROUTE, MODERATOR_ROUTE, REGISTATION_ROUTE, USER_PROFILE_ROUTE } from '../../utils/Paths';

const Bar = observer(() => {
    const {user} = useContext(Context);
    const logout = () => {
        user.setUser([]);
        user.setIsAuth(false);
        localStorage.removeItem('token')
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand><NavLink style={{ color: 'white', textDecoration: 'none' }} to={HOME_ROUTE}>Car Rent</NavLink></Navbar.Brand>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        {
                             user.user.roles.find((role) => role === "ROLE_ADMIN") && <NavLink className={"ms-3"} style={{ color: 'white', textDecoration: 'none' }} to={ADMIN_ROUTE}>Админ</NavLink>
                        }
                        {
                            user.user.roles.find((role) => role === "ROLE_MODERATOR") && <NavLink className={"ms-3"} style={{ color: 'white', textDecoration: 'none' }} to={MODERATOR_ROUTE}>Модератор</NavLink>
                        }
                        <NavLink className={"ms-3"} style={{ color: 'white', textDecoration: 'none' }} to={CAR_LIST_ROUTE}>Машины</NavLink>
                        <NavLink className={"ms-3"} style={{ color: 'white', textDecoration: 'none' }} to={USER_PROFILE_ROUTE}>Профиль</NavLink>
                        <NavLink className={"ms-3"} style={{ color: 'white', textDecoration: 'none' }} to={LOGIN_ROUTE} onClick={logout}>Выйти</NavLink>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <NavLink style={{ color: 'white', textDecoration: 'none' }} to={LOGIN_ROUTE}>Войти</NavLink>
                        <NavLink className={"ms-3"} style={{ color: 'white', textDecoration: 'none' }} to={REGISTATION_ROUTE}>Регестрация</NavLink>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
})

export default Bar;