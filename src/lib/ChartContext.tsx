import EChartsReact from 'echarts-for-react'
import { createContext, ReactNode, RefObject, useRef } from 'react'

type ChartRef = RefObject<EChartsReact | null>

export const ChartContext = createContext<ChartRef>({} as ChartRef)

const ChartProvider = ({ children }: { children: ReactNode }) => {
	const chartRef = useRef<EChartsReact>(null)
	return <ChartContext.Provider value={chartRef}>{children}</ChartContext.Provider>
}

export default ChartProvider
