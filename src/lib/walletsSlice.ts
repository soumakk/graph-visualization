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
		sender_address: 'bc1qre7n9nm6fec9ffqgsuk906qmg9mwvvsc99tytz',
		receiver_address: 'bc1qng0keqn7cq6p8qdt4rjnzdxrygnzq7nd0pju8q',
		amount: '1.83390415',
		date: '2022-07-08 14:44:18',
		token_type: 'BTC',
		entity_name: 'Unknown',
	},
	{
		sender_address: '1P5ZEDWTKTFGxQjZphgWPQUpe554WKDfHQ',
		receiver_address: 'bc1q6nxdnz58kexp48sm2t3scwqcw9stt7r8s7uuwn',
		amount: '0.58211000',
		date: '2022-07-10 13:22:10',
		token_type: 'BTC',
		entity_name: 'Coinbase',
	},
	{
		sender_address: '39RxUoh4ETUm37tprzYApgFJioQAUd8im9',
		receiver_address: 'bc1qq7ldp3mza8q7q9e9gmzg72rzafyegckg57wluu',
		amount: '0.53667821',
		date: '2022-07-07 10:05:09',
		token_type: 'BTC',
		entity_name: 'Bitfinex',
	},
	// {
	// 	sender_address: 'bc1qng0keqn7cq6p8qdt4rjnzdxrygnzq7nd0pju8q',
	// 	receiver_address: 'bc1qajuxzxmpejurlslkrq7y9dpyegp7392ty8x5xt',
	// 	amount: '0.12888000',
	// 	date: '2022-07-06 12:45:55',
	// 	token_type: 'BTC',
	// 	entity_name: 'Whitebit',
	// },
	// {
	// 	sender_address: '3Bn9uxMTY9HpTLaCo9YNBTq96QNhSYRxJk',
	// 	receiver_address: 'bc1qre7n9nm6fec9ffqgsuk906qmg9mwvvsc99tytz',
	// 	amount: '0.07815000',
	// 	date: '2022-07-06 01:17:40',
	// 	token_type: 'BTC',
	// 	entity_name: 'Kraken',
	// },
	// {
	// 	sender_address: 'bc1qajuxzxmpejurlslkrq7y9dpyegp7392ty8x5xt',
	// 	receiver_address: '3Bn9uxMTY9HpTLaCo9YNBTq96QNhSYRxJk',
	// 	amount: '0.01007642',
	// 	date: '2022-07-05 23:00:00',
	// 	token_type: 'BTC',
	// 	entity_name: 'Whitebit',
	// },
	// {
	// 	sender_address: 'bc1qq7ldp3mza8q7q9e9gmzg72rzafyegckg57wluu',
	// 	receiver_address: 'bc1qajuxzxmpejurlslkrq7y9dpyegp7392ty8x5xt',
	// 	amount: '0.03244000',
	// 	date: '2022-07-05 18:33:42',
	// 	token_type: 'BTC',
	// 	entity_name: 'Changenow',
	// },
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
	},
})

export const { selectNode } = walletSlice.actions

export default walletSlice.reducer
