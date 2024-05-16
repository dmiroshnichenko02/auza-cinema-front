import { errorCatch } from '@/api/api.heplers'
import { toastrError } from '@/utils/toastrError'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastr } from 'react-redux-toastr'

import { authService } from '@/services/auth.service'
import { IAuthResponse, IEmailPassword } from './user.interface'

// register
export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/register',
	async ({ email, password }, thunkApi) => {
		try {
			const response = await authService.register(email, password)
			toastr.success('Registration', 'Registered successfully')
			return response.data
		} catch (error) {
			toastrError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)

// login

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/login',
	async ({ email, password }, thunkApi) => {
		try {
			const response = await authService.login(email, password)
			toastr.success('Login', 'Login successfully')
			return response.data
		} catch (error) {
			toastrError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)

// logout

export const logout = createAsyncThunk('auth/logout', async () => {
	await authService.logout()
})

// checkAuth

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/check-auth',
	async (_, thunkApi) => {
		try {
			const response = await authService.getNewTokens()
			return response.data
		} catch (error) {
			if (errorCatch(error) === 'jwt expired') {
				toastr.error(
					'Logout',
					'Your authorization is expired please login again'
				)
				thunkApi.dispatch(logout())
			}
			toastrError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)
