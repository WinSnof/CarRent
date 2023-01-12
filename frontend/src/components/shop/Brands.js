import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import {  Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { deleteBrand, getBrands, getCars, getCarsById } from '../../http/carAPI';
import { Context } from '../../index';

const Brands = observer(() => {

    const { cars } = useContext(Context);
    const { user } = useContext(Context);

    useEffect(() => {
        getBrands().then(data => cars.setBrands(data))
    }, [cars])


    const deleteChoosen = async (id) => {
        const result = window.confirm('Вы точно хотите удалить бренд? Его удаление приведет к удалению всех связанных записей.');
        if(result) {
            try {
                await deleteBrand(id);
                const newBrandsResponse = await getBrands();
                const newCarsResponse = await getCars();
                cars.setBrands(newBrandsResponse);
                cars.setCars(newCarsResponse);
            } catch(e) {
                alert(e.response.error.message);
            }
        }

    }

    const setCarsFilter = async(brand) =>{
        try {
            cars.setSelected(brand);
            const response = await getCarsById(brand.id);
            cars.setCars(response);
        } catch(e) {
            alert(e)
        }
    }

    const reset = async() => {
        cars.setSelected(0);
        const response = await getCars();
        cars.setCars(response);
    }

    return (
        <ListGroup>
            {
                cars.brands.map((brand) =>
                    <ListGroup.Item className="d-flex justify-content-between align-items-start" onClick={() => setCarsFilter(brand)} style={{ cursor: 'pointer' }} key={brand.id} value={brand.id} active={brand.id === cars.selected.id}>
                        {brand.name}
                        {
                            user.user.roles.find((role) => role === "ROLE_ADMIN") && <Button variant="danger" size="sm" onClick={() => deleteChoosen(brand.id)} >x</Button>
                        }
                    </ListGroup.Item>
                )
            }
            <Button onClick={reset} className="mt-3">Сбросить фильтр</Button>
        </ListGroup>
    )
})

export default Brands;