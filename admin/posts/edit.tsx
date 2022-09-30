import React, { useState } from 'react'
import Button from '../../components/Button'
import CategorySelector from '../../components/Selectors/categorySelector'
import CustomEditor from '../../components/Admin/new/editor'
import { VALIDATE_POST } from '../../components/Validations'
import { toast } from 'react-toastify'
import { useStateValue } from '../../context/StateProvider'
import { BiAddToQueue, BiLoaderCircle } from 'react-icons/bi'
import { useRouter } from 'next/router'

const EditP = () => {
	const router = useRouter()
	const path = router.asPath
	const paths = path.split("/")
	const pslug = paths[paths.length -1]
	const [{ posts, user }, dispatch] = useStateValue();
	const post = posts.filter((post: any) => post.slug.toLowerCase().includes(pslug.toLowerCase()))[0];

	const [categories, setCategories] = useState(post.categories)
	const [body, setBody] = useState(post.content)
	const [title, setTitle] = useState(post.title)
	const [slug, setSlug] = useState(post.slug)
	const [loading, setLoading] = useState(false)

	const handleCategoryChange = (selectedCategories: any) => {
		const options = selectedCategories.map((category: any) => {
			return category.value
		})
		setCategories(options)
		// console.log(options)
	}

	const handleTitleChange = (e: any) => {
		setTitle(e.target.value)
		generateSlug(e.target.value)
	}

	const generateSlug = (title: string) => {
		setSlug(title.toLowerCase().replace(/ /g, '-'))
	}

	const updatePost = async () => {
		// setLoading(true)
		// const post = {
		// 	title,
		// 	slug,
		// 	content: body,
		// 	categories,
		// }
		// if (!VALIDATE_POST(post)) return
		// await UPDATE_POST(user?.access_token, post, (data: any) => {
		// 	if (data.success) {
		// 		dispatch({
		// 			type: 'UPDATE_POST',
		// 			post: data.data,
		// 		})
		// 		toast.success(data?.message || 'Post updated successfully')
		// 	} else {
		// 		toast.error(data?.message || 'Something went wrong >>')
		// 	}
		// })
		// setLoading(false)
	}

	return (
		<div className='w-full h-full bg-white rounded p-4 poppins'>
			<form
				action=''
				method='post'
				autoComplete='off'
				autoCorrect='on'
				autoSave='on'
			>
				<h1 className='font-bold text-xl capitalize text-primary font-sans mb-4'>
					Edit Post
				</h1>
				<div className='w-full h-full flex items-center jusstify-center gap-x-4'>
					<div className='w-1/2'>
						<div className='flex flex-col mb-3'>
							<label
								htmlFor='title-input'
								className='block mb-2 font-medium text-gray-900'
							>
								Title
							</label>
							<input
								type='text'
								id='title-input'
								value={title}
								onChange={handleTitleChange}
								className='block p-2 px-4 w-full text-gray-900 border-2 border-transparent focus:border-primary bg-gray-50 rounded-lg outline-none'
								placeholder='Title'
							/>
						</div>
						<div className='flex flex-col mb-3'>
							<label
								htmlFor='slug-input'
								className='block mb-2 font-medium text-gray-900'
							>
								Slug
							</label>
							<input
								type='text'
								id='slug-input'
								readOnly
								value={slug}
								onChange={(e) => generateSlug(e.target.value)}
								className='block p-2 px-4 w-full text-gray-900 border-2 border-transparent focus:border-primary bg-gray-50 rounded-lg outline-none'
								placeholder='Slug'
							/>
						</div>
						<div className='flex flex-col mb-3'>
							<label
								htmlFor='categories-selector'
								className='block mb-2 font-medium text-gray-900'
							>
								Category (s)
							</label>
							<CategorySelector onChange={handleCategoryChange} />
						</div>
					</div>
					<div className='w-1/2'>
						<div className='flex flex-col mb-3'>
							<CustomEditor val={body} setVal={setBody} />
						</div>
						<div className='flex flex-col mb-3 items-end'>
							<Button
								text={loading ? 'Updating....' : 'Update'}
								icon={
									loading ? (
										<BiLoaderCircle className='animate animate-spin' />
									) : (
										<BiAddToQueue />
									)
								}
								type='button'
								disabled={loading}
								shape='rounded-md'
								onClick={updatePost}
							/>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}

export default EditP