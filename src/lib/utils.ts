import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function sliceString(label: string, offset = 3) {
	return `${label.slice(0, offset)}...${label.slice(label.length - offset)}`
}
