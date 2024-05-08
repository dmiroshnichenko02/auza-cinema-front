import styles from '@/components/layout/Layout.module.scss'

import { SITE_NAME } from '@/configs/seo.config'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.scss'

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
			<body className={`${outfit.className} ${styles.layout}`}>
				<ReactQueryProvider>{children}</ReactQueryProvider>
			</body>
		</html>
	)
}
