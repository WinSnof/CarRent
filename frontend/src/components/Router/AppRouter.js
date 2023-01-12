import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Context } from "../..";
import { Home } from "../../pages/Home";
import { authRoutes, publicRoutes } from "../../Routes";

export const AppRouter = observer(() => {

    const {user} = useContext(Context);
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Element}) => <Route exact path={path} element={<Element/>} key={path}/>)}
            {publicRoutes.map(({path, Element}) => <Route exact path={path} element={<Element/>} key={path}/>)}
            <Route path='/*' element={<Home/>}/>
        </Routes>
    );
})