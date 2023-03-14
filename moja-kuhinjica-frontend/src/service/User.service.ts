import { axiosInstance } from 'src/config/axios'
import { Component } from 'react'
import { FieldValues } from 'react-hook-form'
import { axiosRoutes } from '@/constants/constants'

export interface ILoggedInUser {
    id: string
    name: string
    surname: string
    phoneNumber: string
    role: string
}

export interface IUser {
    id: string
    name: string
    surname: string
    phoneNumber: string
    email: string
}
export default class UserService extends Component {
    public static async login(data: FieldValues): Promise<any> {
        return await axiosInstance.post(axiosRoutes.user.USER_LOGIN, data)
    }

    public static async signIn(data: FieldValues): Promise<any> {
        return await axiosInstance.post(axiosRoutes.user.CLIENT, data)
    }

    public static async getLoggedInUser(): Promise<any> {
        return await axiosInstance.get(axiosRoutes.user.USER_AUTH)
    }

    public static async getUserById(
        id: string | string[] | undefined
    ): Promise<any> {
        return await axiosInstance.get(`${axiosRoutes.user.CLIENT}/${id}`)
    }

    public static async editUserProfile(data: FieldValues): Promise<any> {
        return await axiosInstance.patch(axiosRoutes.user.CLIENT, data)
    }

    public static async changePassword(data: FieldValues): Promise<any> {
        return await axiosInstance.patch(axiosRoutes.user.CHANGE_PASSWORD, data)
    }

    public static async forgotPassword(
        data: FieldValues | undefined
    ): Promise<any> {
        return await axiosInstance.get(axiosRoutes.user.FORGOTTEN_PASSSWORD, {
            params: { email: data?.email },
        })
    }

    public static async resetPassword(data: FieldValues): Promise<any> {
        return await axiosInstance.post(axiosRoutes.user.RESET_PASSWORD, data)
    }
}
