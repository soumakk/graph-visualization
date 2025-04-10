import SidePanel from './components/SidePanel'
import Visualizer from './components/Visualizer'
import ChartProvider from './lib/ChartContext'

function App() {
	return (
		<ChartProvider>
			<div className="h-screen relative flex">
				<SidePanel />
				<Visualizer />
			</div>
		</ChartProvider>
	)
}

export default App
