import { makeAutoObservable } from 'mobx'

export default class AppCars {
    constructor() {
        this._selected = 0;

        this._carBrands = [];
        this._carFuelTypes = [];
        this._carBodyTypes = [];
        this._carClasses = [];

        this._cars = [];
        makeAutoObservable(this);
    }


    //Класс машины
    setClasses(carclasses) {
        this._carClasses = carclasses;
    }

    get carClasses() {
        return this._carClasses;
    }

    //Тип кузова
    setBodyTypes(bodyTypes) {
        this._carBodyTypes = bodyTypes;
    }

    get bodyTypes() {
        return this._carBodyTypes;
    }

    //Типы топлива
    setFuelTypes(fuelTypes) {
        this._carFuelTypes = fuelTypes;
    }

    get fuelTypes() {
        return this._carFuelTypes;
    }

    //Бренды
    setBrands(brands) {
        this._carBrands = brands;
    }

    get brands() {
        return this._carBrands;
    }

    //Выбранный элемент для фильтрации
    setSelected(selected) {
        this._selected = selected;
    }

    get selected() {
        return this._selected;
    }

    //Список машин
    setCars(cars) {
        this._cars = cars;
    }

    get cars() {
        return this._cars;
    }

}