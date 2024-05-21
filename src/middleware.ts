import { NextRequest, NextResponse } from 'next/server'
import { getUsersUrl } from './configs/api.config'
import { logout } from './store/user/user.actions'

export async function middleware(req: NextRequest, res: NextResponse) {
	const { pathname } = req.nextUrl

	const accessToken = req.cookies.get('accessToken')?.value
	const refreshToken = req.cookies.get('refreshToken')?.value

	const isOwnerPage = pathname.includes('/owner')
	const isProfilePage = pathname.includes('/profile')
	const isAuthPage = pathname.includes('/auth')

	const user = await (
		await fetch(getUsersUrl('/profile'), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			}
		})
	).json()

	if (!refreshToken) {
		logout()
		return NextResponse.redirect(new URL('/auth', req.url))
	}

	if (refreshToken && isAuthPage) {
		return NextResponse.redirect(new URL('/', req.url))
	}

	if (isAuthPage) {
		return NextResponse.next()
	}

	if (!user.isAdmin && isOwnerPage) {
		return NextResponse.redirect(new URL('/404', req.url))
	}

	// if (!refreshToken && isProfilePage) {
	// 	return NextResponse.redirect(new URL('/auth', req.url))
	// }
}

export const config = {
	matcher: ['/owner/:path*', '/auth/:path*', '/profile/:path*']
}
