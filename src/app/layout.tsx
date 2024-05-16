import '@/assets/styles/globals.scss'
import { SITE_NAME } from '@/configs/seo.config'
import MainProvider from '@/providers/MainProvider'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Online cinema'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={outfit.className}>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	)
}
