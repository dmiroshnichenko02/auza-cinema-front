import styles from '@/components/layout/Layout.module.scss'
import Navigation from '@/components/layout/navigation/Navigation'
import Sidebar from '@/components/layout/sidebar/Sidebar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.className} ${styles.layout}`}>
				<Navigation />
				<div className={styles.center}>{children}</div>
				<Sidebar />
			</body>
		</html>
	)
}
