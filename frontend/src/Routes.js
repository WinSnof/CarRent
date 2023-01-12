import { ADMIN_ROUTE, CAR_LIST_ROUTE, HOME_ROUTE, LOGIN_ROUTE, MODERATOR_ROUTE, REGISTATION_ROUTE, USER_PROFILE_ROUTE } from "./utils/Paths"
import {Registration} from './pages/auth/Registration'
import {Login} from './pages/auth/Login'
import {Home} from './pages/Home'
import {Profile} from './pages/user/Profile'
import {Admin} from './pages/user/Admin'
import {Moderator} from './pages/user/Moderator'
import Shop from "./components/shop/Shop"

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Element: Login
    },
    {
        path: REGISTATION_ROUTE,
        Element: Registration 
    },
    {
        path: HOME_ROUTE,
        Element: Home 
    }
]

export const authRoutes = [
    {
        path: USER_PROFILE_ROUTE,
        Element: Profile 
    },
    {
        path: ADMIN_ROUTE,
        Element: Admin 
    },
    {
        path: MODERATOR_ROUTE,
        Element: Moderator 
    },
    {
        path: CAR_LIST_ROUTE,
        Element: Shop 
    },

]