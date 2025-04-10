import { createSlice } from '@reduxjs/toolkit'

interface ITransaction {
	sender_address: string
	receiver_address: string
	amount: string
	date: string
	token_type: string
}

const transactions = [
	{
		sender_address: '3Kx1X8DPtMWX5PXDo3dM6RZfpCr5knBNz7',
		receiver_address: 'bc1q6nxdnz58kexp48sm2t3scwqcw9stt7r8s7uuwn',
		amount: '0.25430000',
		date: '2022-07-10 08:32:21',
		token_type: 'BTC',
		entity_name: 'Binance',
	},
	{
		sender_address: 'bc1qng0keqn7cq6p8qdt4rjnzdxrygnzq7nd0pju8q',
		receiver_address: '3Kx1X8DPtMWX5PXDo3dM6RZfpCr5knBNz7',
		amount: '0.12890000',
		date: '2022-07-09 19:11:03',
		token_type: 'BTC',
		entity_name: 'Changenow',
	},
	{
		sender_address: 'bc1qng0keqn7cq6p8qdt4rjnzdxrygnzq7nd0pju8q',
		receiver_address: 'bc1q6nxdnz58kexp48sm2t3scwqcw9stt7r8s7uuwn',
		amount: '1.83390415',
		date: '2022-07-08 14:44:18',
		token_type: 'BTC',
		entity_name: 'Unknown',
	},
	{
		sender_address: 'bc1q6nxdnz58kexp48sm2t3scwqcw9stt7r8s7uuwn',
		receiver_address: '1P5ZEDWTKTFGxQjZphgWPQUpe554WKDfHQ',
		amount: '0.58211000',
		date: '2022-07-10 13:22:10',
		token_type: 'BTC',
		entity_name: 'Coinbase',
	},
]

interface WalletsState {
	selectedNode: string | null
	transactions: ITransaction[]
}

const initialState: WalletsState = {
	selectedNode: null,
	transactions,
}
export const walletSlice = createSlice({
	name: 'wallets',
	initialState,
	reducers: {
		selectNode: (state, action) => {
			if (action.payload === state.selectedNode) {
				state.selectedNode = null
			} else {
				state.selectedNode = action.payload
			}
		},
		addNewNode: (state, action) => {
			state.transactions = state.transactions.concat([action.payload])
		},
	},
})

export const { selectNode, addNewNode } = walletSlice.actions

export default walletSlice.reducer
