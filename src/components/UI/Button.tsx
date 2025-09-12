import { ButtonHTMLAttributes } from 'react'

import clsx from 'clsx'

type TVariantButton = 'primary'
type Props = {
	variant?: TVariantButton
} & ButtonHTMLAttributes<HTMLButtonElement>

function Button({ variant = 'primary', children, ...rest }: Props) {
	const baseClasses =
		'text-center px-16 py-6 rounded-2xl font-semibold text-base hover:cursor-pointer flex items-center justify-center'
	const variantClasses = clsx({
		'min-w-[184px] h-[64px] bg-[#FF5F00] hover:bg-[#FF9E59] text-white active:bg-[#FF3D00]':
			variant === 'primary'
	})

	return (
		<button
			{...rest}
			className={clsx(baseClasses, variantClasses)}
		>
			{children}
		</button>
	)
}

export default Button
