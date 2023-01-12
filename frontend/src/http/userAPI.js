import {$authHost, $host} from './index'

//Авторизация пользователя
export const login = async(username, password) => {
    const {data} = await $host.post('/api/v1/auth/signing', {username, password});
    localStorage.setItem('token', data.token);
    return data;
}
//Регистрация нового пользователя
export const registration = async(username, email, password) => {
    const {data} = await $host.post('/api/v1/auth/signup', {username, email, password});
    return data;
}

//Заполнение данныех пользователя
export const setUserInfo = async(id,first_name, last_name, patronymic, passportSerial, passportNumber, dateOfBirth, phone_number) => {
    const {data} = await $authHost.post('/api/v1/profile/add-info', {id,first_name, last_name, patronymic, passportSerial, passportNumber, dateOfBirth,phone_number});
    return data;
}

//Получение данных пользователя
export const getUserInfo = async(userId) => {
    const {data} = await $authHost.get('/api/v1/profile/' + userId);
    return data;
}


//ADMIN ROLE
export const getUsers = async() => {
    const {data} = await $authHost.get('/api/v1/admin/users');
    return data;
}

//Получение ролей
export const getRoles = async() => {
    const {data} = await $authHost.get('/api/v1/admin/roles');
    return data;
}

//Добавление роли пользователю
export const addRolesToUser = async(userId, roleId) => {
    const {data} = await $authHost.post('/api/v1/admin/role/' + userId + '/' + roleId);
    return data;
}
//Удаление роли пользователю
export const deleteRolesFromUser = async(userId, roleId) => {
    const {data} = await $authHost.delete('/api/v1/admin/role/' + userId + '/' + roleId);
    return data;
}
//Удаление пользователя
export const deleteUser = async(userId) => {
    const {data} = await $authHost.delete('/api/v1/admin/user/' + userId);
    return data;
}

//Запрос на аренду авто
export const rentRequest = async(userId, carId, startDate, endDate) => {
    const {data} = await $authHost.post('/api/v1/profile/rent-car', {userId, carId, startDate, endDate});
    return data;
}

//Проверка валидности JWT токена при перезагрузке
export const check = async() => {
    const jwt = localStorage.getItem('token')
    const {data} = await $authHost.post('/api/v1/auth/check', {jwt});
    return data;
}

//Наконец то модерка
export const getNewRentRequests = async() => {
    const {data} = await $authHost.get('/api/v1/moderator/new/rents-requests');
    return data;
}

export const cancelRent = async(id) => {
    const {data} = await $authHost.put('/api/v1/moderator/cancel-request/' + id);
    return data;
}

export const completeRent = async(id) => {
    const {data} = await $authHost.put('/api/v1/moderator/complete-request/' + id);
    return data;
}

