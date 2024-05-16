import { getContentType } from '@/api/api.heplers'
import { axiosClassic } from '@/api/interceptors'
import { getAuthUrl } from '@/configs/api.config'
import Cookies from 'js-cookie'
import {
	removeTokensStorage,
	saveToStorage
} from '../store/user/auth/auth.helper'
import { IAuthResponse } from '../store/user/user.interface'

export const authService = {
	async register(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/register'),
			{ email, password }
		)

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}

		return response
	},

	async login(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/login'),
			{ email, password }
		)

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}

		return response
	},

	async logout() {
		removeTokensStorage()
		localStorage.removeItem('user')
	},

	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')

		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/login/access-token'),
			{
				refreshToken
			},
			{
				headers: getContentType()
			}
		)

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response
	}
}
