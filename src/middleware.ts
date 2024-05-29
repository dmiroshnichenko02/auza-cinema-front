import { NextRequest, NextResponse } from 'next/server'
import { getUsersUrl } from './configs/api.config'
import { getStoreLocal } from './utils/localStorage'

export const config = {
	matcher: ['/owner/:path*', '/auth/:path*', '/profile/:path*']
}

export async function middleware(req: NextRequest, res: NextResponse) {
	const { pathname } = req.nextUrl

	const accessToken = req.cookies.get('accessToken')?.value
	const refreshToken = req.cookies.get('refreshToken')?.value
	const localStorage = await getStoreLocal('user')

	const isOwnerPage = pathname.includes('/owner')
	const isProfilePage = pathname.includes('/profile')
	const isAuthPage = pathname.includes('/auth')
	const isHomePage = pathname.includes('/')

	const user = await (
		await fetch(getUsersUrl('/profile'), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			}
		})
	).json()

	if (!accessToken && !isAuthPage) {
		return NextResponse.redirect(new URL('/auth', req.url))
	}

	if (isOwnerPage && user.isAdmin) {
		return NextResponse.next()
	}

	if (isProfilePage && user) {
		return NextResponse.next()
	}
}
