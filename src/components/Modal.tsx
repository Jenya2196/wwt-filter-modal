import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

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

				<div className="flex items-center justify-center relative h-12">
					<h2 className="text-[40px] font-semibold">{title}</h2>
					<button
						onClick={handleClose}
						className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-200 transition hover:cursor-pointer"
					>
						<svg
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
							className="w-5 h-5 text-gray-500"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M6.00965 7.39205L1.69574 11.7037C1.50323 11.8962 1.26981 11.9902 0.995501 11.986C0.721212 11.9817 0.487809 11.8834 0.295293 11.691C0.102776 11.4985 0.00651866 11.2631 0.00651866 10.9847C0.00651866 10.7063 0.102776 10.4709 0.295293 10.2785L4.59645 5.97958L0.282502 1.70113C0.0899852 1.50871 -0.00413541 1.27329 0.000139283 0.994875C0.00439183 0.716457 0.102776 0.48104 0.295293 0.288624C0.487809 0.0962085 0.72335 0 1.00191 0C1.28046 0 1.51598 0.0962085 1.7085 0.288624L6.00965 4.60032L10.2903 0.288624C10.4829 0.0962085 10.7163 0 10.9906 0C11.2649 0 11.4983 0.0962085 11.6908 0.288624C11.8969 0.494677 12 0.733504 12 1.0051C12 1.2767 11.8969 1.50871 11.6908 1.70113L7.38964 5.97958L11.7036 10.2912C11.8961 10.4837 11.9924 10.7169 11.9924 10.9911C11.9924 11.2653 11.8961 11.4985 11.7036 11.691C11.4974 11.897 11.2585 12 10.9867 12C10.715 12 10.4829 11.897 10.2903 11.691L6.00965 7.39205Z"
								fill="#31393C"
							/>
						</svg>
					</button>
				</div>
				<div className="overflow-y-auto">{children}</div>
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
			className={clsx((className = 'flex-1 overflow-y-auto'), className)}
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
			className={clsx('flex-none pt-2 sticky bottom-0 bg-white', className)}
		>
			{children}
		</div>
	)
}
Modal.Content = Content
Modal.Line = Line
Modal.Footer = Footer

export default Modal
