import {$authHost} from './index'


//Получить абсолютно все машины
export const getCars = async() => {
    const {data} = await $authHost.get('/api/v1/cars/get-all');
    return data;
}

//Получить машины по бренду
export const getCarsById = async(id) => {
    const {data} = await $authHost.get('/api/v1/cars/get-all/' + id);
    return data;
}

//Получить абсолютно все бренды
export const getBrands = async() => {
    const {data} = await $authHost.get('/api/v1/cars/brands');
    return data;
}

//Получить абсолютно все классы
export const getCarClasses = async() => {
    const {data} = await $authHost.get('/api/v1/cars/car-classes');
    return data;
}

//Получить абсолютно все типы топлива
export const getFuelTypes = async() => {
    const {data} = await $authHost.get('/api/v1/cars/fuels');
    return data;
}

//Получить абсолютно все типы кузова
export const getBodyTypes = async() => {
    const {data} = await $authHost.get('/api/v1/cars/body-types');
    return data;
}

//Добавить новую машину
export const addCar = async(id, model, car_type_id, car_brand_id, year, transmission, fuel_type_id, body_type_id, engineVolume, horsePower, fuelConsumption, deposit, carCount, price ) => {
    await $authHost.post('/api/v1/cars/add',{id, model, car_type_id, car_brand_id, year, transmission, fuel_type_id, body_type_id, engineVolume, horsePower, fuelConsumption, deposit, carCount, price} );
}

//Добавить новый бренд
export const addBrand = async(id, name) => {
    const {data} =  await $authHost.post('/api/v1/cars/brands', {id, name});
    return data;
}

//Удалить бренд
export const deleteBrand = async(id) => {
    const {data} =  await $authHost.delete('/api/v1/cars/brands/' + id);
    return data;
}

//Удалить машину
export const deleteCar = async(id) => {
    const {data} =  await $authHost.delete('/api/v1/cars/' + id);
    return data;
}
