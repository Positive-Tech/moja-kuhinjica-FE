import { axiosInstance } from 'src/config/axios'
import { Component } from 'react'

export interface IMenu {
    id: string
    date: string
    meals: IMeal[]
}
export interface IMeal {
    id: string
    title: string
    price: number
    description: string
    image: string
    type: IMealType
}
export interface IMealType {
    id: number
    name: string
}
export default class RestaurantService extends Component {
    public static async fetchAllMenus(): Promise<any> {
        return await axiosInstance.get('/restaurant/1/menu/all')
    }
}