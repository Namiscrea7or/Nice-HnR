import React from 'react'
import './Dish.css'

const Dish = ({ DishData1 }) => {
    const DishData = {
        dish_name: 'Ratatouille',
        description: 'Italian Salad, made by a mouse',
        state: 'false',
        price: 30000
    }
    let states = ''
    if (DishData.state === 'true') {
        states = 'available'
    }
    else {
        states = 'inavailable'
    }
    return (
        <div className='dishContainer'>
            <div className='dish'>
                <img src={require(`./img/${DishData.dish_name}.jpg`)} alt="" />
                <h2>Tên món: {DishData.dish_name}</h2>
                <div className='dishInfo'>
                    <p>Mô tả: {DishData.description}</p>
                    <p>Trạng thái: {states}</p>
                    <p>Giá: {DishData.price}</p>
                </div>
            </div>
        </div>
    )
}

export default Dish