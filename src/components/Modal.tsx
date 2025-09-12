import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'

import clsx from 'clsx'
import { X } from 'lucide-react'

type ModalProps = {
	title: string
	children: React.ReactNode
	isOpen: boolean
	className?: string
	onClose?: () => void
}

function Modal({ title, className, children, onClose, isOpen }: ModalProps) {
	const mainRef = useRef<HTMLDivElement | null>(null)
	const [visible, setVisible] = useState(false)
	const [animateIn, setAnimateIn] = useState(false)

	useEffect(() => {
		if (isOpen) {
			setVisible(true)
			const t = setTimeout(() => setAnimateIn(true), 10)
			return () => clearTimeout(t)
		} else {
			setAnimateIn(false)
			const t = setTimeout(() => setVisible(false), 300)
			return () => clearTimeout(t)
		}
	}, [isOpen])

	if (!visible) return null

	const handleClose = () => {
		onClose?.()
	}

	return (
		<div
			ref={mainRef}
			className={clsx(
				'fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 backdrop-blur-xs',
				animateIn ? 'opacity-100' : 'opacity-0'
			)}
			onClick={handleClose}
		>
			<div
				className={clsx(
					'relative border w-full min-h-74 max-h-9/10 md:max-h-4/5 bg-white mt-20 md:mx-10 md:my-20 lg:m-20 rounded-t-2xl md:rounded-2xl p-6 transform transition-all duration-300 flex flex-col',
					animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
					className
				)}
				onClick={e => e.stopPropagation()}
			>
				{/* scroll all content */}
				{/* <div className="overflow-y-auto"> */}
				<div className="flex items-center justify-center relative h-12">
					<h2 className="text-[40px] font-semibold">{title}</h2>
					<button
						onClick={handleClose}
						className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-200 transition"
					>
						<X className="w-5 h-5 text-gray-500" />
					</button>
				</div>
				{children}
				{/* </div> */}
			</div>
		</div>
	)
}

// Сабкомпоненты
type TSub = { children?: React.ReactNode } & HTMLAttributes<HTMLDivElement>
function Content({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...rest}
			className={clsx((className = 'flex-1 overflow-y-auto mt-4'), className)}
		/>
	)
}

function Line({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...rest}
			className={clsx('border-b-2 border-gray-200 my-4', className)}
		/>
	)
}
function Footer({ className, children, ...rest }: TSub) {
	return (
		<div
			{...rest}
			className={clsx('flex-none pt-4 sticky bottom-0 bg-white', className)}
		>
			{children}
		</div>
	)
}
Modal.Content = Content
Modal.Line = Line
Modal.Footer = Footer

export default Modal
