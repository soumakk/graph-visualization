import { configureStore } from '@reduxjs/toolkit'
import walletsReducer from './walletsSlice'
import { useDispatch, useSelector } from 'react-redux'

const store = configureStore({
	reducer: {
		wallets: walletsReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store
