import React, { forwardRef } from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const { className, children, ...rest } = props
	return (
		<button
			ref={ref}
			className={cn(
				'h-9 px-4 text-sm font-medium inline-flex items-center justify-center bg-primary text-white rounded-md',
				className
			)}
			{...rest}
		>
			{children}
		</button>
	)
})

export default Button
