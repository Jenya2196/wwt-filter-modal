import { ButtonHTMLAttributes } from 'react'

import clsx from 'clsx'

type TVariantButton = 'primary' | 'gray'
type Props = {
	variant?: TVariantButton
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
	variant = 'primary',
	className,
	children,
	...rest
}: Props) => {
	const baseClasses =
		'min-w-[184px] h-[48px] md:h-[64px] text-center px-20 py-5 md:px-16 md:py-6 rounded-2xl font-semibold text-base hover:cursor-pointer flex items-center justify-center '
	const variantClasses = clsx({
		'bg-[#FF5F00] hover:bg-[#FF9E59] text-white active:bg-[#FF3D00]':
			variant === 'primary',
		'border border-gray-300 text-gray-600 bg-white hover:bg-[#F4F4F4] active:border-[#FF3D00] active:text-[#FF3D00]':
			variant === 'gray'
	})

	return (
		<button
			{...rest}
			className={clsx(baseClasses, variantClasses, className)}
		>
			{children}
		</button>
	)
}

export default Button
