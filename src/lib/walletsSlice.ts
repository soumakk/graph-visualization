import { createSlice } from '@reduxjs/toolkit'

interface WalletsState {
	value: number
}

const initialState: WalletsState = {
	value: 0,
}
export const walletSlice = createSlice({
	name: 'wallets',
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1
		},
		decrement: (state) => {
			state.value -= 1
		},
		incrementByAmount: (state, action) => {
			state.value += action.payload
		},
	},
})

export const { increment, decrement, incrementByAmount } = walletSlice.actions

export default walletSlice.reducer
