import { Provider } from 'react-redux'
import SidePanel from './components/SidePanel'
import Visualizer from './components/Visualizer'
import ChartProvider from './lib/ChartContext'
import store from './store/store'

function App() {
	return (
		<Provider store={store}>
			<ChartProvider>
				<div className="h-screen relative flex">
					<SidePanel />
					<Visualizer />
				</div>
			</ChartProvider>
		</Provider>
	)
}

export default App
