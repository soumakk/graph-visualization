import { EChartsOption } from 'echarts'
import ReactECharts from 'echarts-for-react'
import { BarChart } from 'echarts/charts'
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer])

function App() {
	const axisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	const data = axisData.map(function (item, i) {
		return Math.round(Math.random() * 1000 * (i + 1))
	})
	const links = data.map(function (item, i) {
		return {
			source: i,
			target: i + 1,
		}
	})

	const nodes = axisData.map((item, i) => ({
		id: String(i),
		name: item, // shown in label
		value: data[i], // optional, for tooltip or metadata
		symbolSize: 40, // You can scale this dynamically based on value
		label: {
			show: true,
			position: 'inside',
			color: '#fff', // better readability
			fontSize: 12,
			formatter: '{b}',
		},
	}))

	const options: EChartsOption = {
		// grid: { top: 10, right: 8, bottom: 24, left: 36 },
		grid: {
			show: false,
		},
		xAxis: {
			type: 'category',
			boundaryGap: true,
			data: axisData,
			show: false,
		},
		yAxis: {
			show: false,
			type: 'value',
		},
		series: [
			{
				data: nodes,
				type: 'graph',
				layout: 'force',
				roam: true,
				animation: false,
				force: {
					edgeLength: 80,
					repulsion: 50,
					gravity: 0.001,
					layoutAnimation: true,
				},
				edgeSymbol: ['none', 'arrow'],
				edgeSymbolSize: [0, 8],
				links,
				lineStyle: {
					opacity: 1,
				},
			},
		],
		tooltip: {
			trigger: 'item',
		},
	}

	return (
		<div style={{ padding: '16px' }}>
			<ReactECharts
				option={options}
				opts={{
					renderer: 'svg',
				}}
				theme="light"
				echarts={echarts}
				onEvents={{}}
			/>
		</div>
	)
}

export default App
