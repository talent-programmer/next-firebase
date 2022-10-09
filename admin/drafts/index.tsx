import Head from 'next/head'
import React from 'react'
import { Navbar, Sidenav } from '../../components/Admin'
import DraftOptions from '../../components/Admin/drafts'

const Drafts = () => {
	return (
		<div>
			<Head>
				<title>Bentility| Admin</title>
				<meta name='description' content='Bentility Admin | Drafts' />
				<link rel='icon' href='/favicon.png' />
			</Head>
			<main className='bg-gray-200 w-screen h-screen '>
				<div className=''>
					<Navbar />
					<div className='flex'>
						<Sidenav page='Drafts' />
						<div className='min-h-[90vh] h-[90vh] overflow-y-auto w-[80%] py-3 px-5 poppins '>
							<DraftOptions />
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default Drafts
