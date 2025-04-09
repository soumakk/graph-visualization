import { useLayoutEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../lib/store'
import { toggleTheme } from '../lib/themeSlice'
import { Switch } from './ui/switch'

export default function ThemeSwitch() {
	const theme = useAppSelector((state) => state.theme.mode)
	const dispatch = useAppDispatch()

	useLayoutEffect(() => {
		const root = window.document.documentElement
		root.classList.remove('light', 'dark')

		root.classList.add(theme)
	}, [theme])

	return (
		<label className="flex items-center gap-2">
			<Switch checked={theme === 'dark'} onCheckedChange={() => dispatch(toggleTheme())} />
			<span className="text-sm">Dark mode</span>
		</label>
	)
}
