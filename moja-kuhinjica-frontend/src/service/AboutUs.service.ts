import { axiosInstance } from 'src/config/axios'
import { Component } from 'react'
import { axiosRoutes } from '@/constants/constants'
export interface IFaq {
    question: string
    answer: string
}
export default class AboutUsService extends Component {
    public static async getFAQ(): Promise<any> {
        return await axiosInstance.get(axiosRoutes.aboutUs.GET_FAQ)
    }
}
