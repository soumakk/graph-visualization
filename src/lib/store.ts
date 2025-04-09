import { configureStore } from '@reduxjs/toolkit'
import walletsSlice from './walletsSlice'
import themeSlice from './themeSlice'
import { useDispatch, useSelector } from 'react-redux'

const store = configureStore({
	reducer: {
		wallets: walletsSlice,
		theme: themeSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store
