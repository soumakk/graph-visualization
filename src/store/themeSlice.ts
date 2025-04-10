import { createSlice } from '@reduxjs/toolkit'

interface IState {
	mode: string
}

const initialState: IState = {
	mode: 'light',
}
export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.mode = state.mode === 'light' ? 'dark' : 'light'
		},
	},
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer
