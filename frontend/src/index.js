import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppCars from './mobx/AppCars';
import AppUser from './mobx/AppUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext(null);
root.render(
    <Context.Provider value={{
        user: new AppUser(),
        cars: new AppCars()
    }}>
        <App />
    </Context.Provider>
);
