import React from 'react'
import { GridDiv } from '../../../styles/global'
import RestaurantCard from '../restaurant_card/RestaurantCard'

const RestaurantList = () => {
    const restaurantCards = [
        {
            name: 'Restoran TOP FOOD 021',
            type: 'RESTORANI',
            foodType: 'Domaća kuhinja',
            distance: 0.5,
            time: 15,
            rating: 4.2,
        },
        {
            name: 'Restoran TOP FOOD 021',
            type: 'RESTORANI',
            foodType: 'Domaća kuhinja',
            distance: 0.5,
            time: 15,
            rating: 4.2,
        },
        {
            name: 'Restoran TOP FOOD 021',
            type: 'RESTORANI',
            foodType: 'Domaća kuhinja',
            distance: 0.5,
            time: 15,
            rating: 4.2,
        },
        {
            name: 'Restoran TOP FOOD 021',
            type: 'RESTORANI',
            foodType: 'Domaća kuhinja',
            distance: 0.5,
            time: 15,
            rating: 4.2,
        },
        {
            name: 'Restoran TOP FOOD 021',
            type: 'RESTORANI',
            foodType: 'Domaća kuhinja',
            distance: 0.5,
            time: 15,
            rating: 4.2,
        },
    ]
    return (
        <GridDiv>
            {restaurantCards.map((restaurant) => {
                return <RestaurantCard restaurant={restaurant} />
            })}
        </GridDiv>
    )
}

export default RestaurantList