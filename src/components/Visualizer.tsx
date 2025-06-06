import copy from 'copy-to-clipboard'
import ReactECharts from 'echarts-for-react'
import { useContext, useMemo } from 'react'
import { ChartContext } from '../lib/ChartContext'
import { sliceString } from '../lib/utils'
import { useAppDispatch, useAppSelector } from '../store/store'
import { selectNode } from '../store/walletsSlice'

export default function Visualizer() {
	const chartRef = useContext(ChartContext)
	const theme = useAppSelector((s) => s.theme.mode)
	const transactions = useAppSelector((s) => s.wallets.transactions)
	const dispatch = useAppDispatch()

	const wallets = useMemo(() => {
		const wallets = new Set()

		transactions?.forEach((t) => {
			wallets.add(t.receiver_address)
			wallets.add(t.sender_address)
		})

		return Array.from(wallets)
	}, [transactions])

	const edges = useMemo(() => {
		return transactions?.map((t) => ({
			source: wallets.findIndex((w) => w === t.sender_address),
			target: wallets.findIndex((w) => w === t.receiver_address),
			label: `${t.amount} ${t.token_type}`,
			date: t.date,
			from: t.sender_address,
			to: t.receiver_address,
		}))
	}, [wallets, transactions])

	const nodes = useMemo(() => {
		return wallets.map((item) => ({
			id: item,
			name: item,
			symbolSize: 70,
			label: {
				show: true,
				position: 'inside',
				color: '#fff',
				formatter: function (params) {
					return sliceString(params.data.name)
				},
			},
			select: {
				itemStyle: {
					borderWidth: 2,
				},
			},
		}))
	}, [wallets])

	const options = useMemo(() => {
		return {
			series: [
				{
					type: 'graph',
					layout: 'force',
					draggable: true,
					roam: true,
					force: {
						edgeLength: 300,
						repulsion: 500,
						gravity: 0.1,
						initLayout: 'circular',
						friction: 0.03,
					},
					data: nodes,
					edgeSymbol: ['none', 'arrow'],
					edgeSymbolSize: [0, 8],
					edges,
					lineStyle: {
						opacity: 1,
					},
					selectedMode: 'single',
					edgeLabel: {
						show: true,
						formatter: function (params) {
							return params?.data?.label
						},
					},
				},
			],
			tooltip: {
				show: true,
				trigger: 'item',
				backgroundColor: '#222',
				borderColor: '#888',
				textStyle: {
					color: '#fff',
					fontSize: 12,
				},
				formatter: function (params) {
					if (params.dataType === 'node') {
						return `
                      <strong>Wallet:</strong> ${params.data.name}<br/>
                    `
					} else if (params.dataType === 'edge') {
						return `
					  <strong>Amount:</strong> ${params.data.label || 'N/A'}<br/>
					  <strong>Date:</strong> ${params.data.date}<br/>
					  <strong>Sender:</strong> ${params.data.from}<br/>
					  <strong>Receiver:</strong> ${params.data.to}
    					`
					}
				},
			},
		}
	}, [edges, nodes])

	const onChartClick = (params) => {
		if (params.dataType === 'node') {
			dispatch(selectNode(params.data.id))
			copy(params.data.id)
		}
	}

	const onEvents = {
		click: onChartClick,
	}

	return (
		<ReactECharts
			ref={chartRef}
			option={options}
			opts={{
				renderer: 'svg',
			}}
			theme={theme}
			onEvents={onEvents}
			style={{
				height: '100%',
				width: 'calc(100vw - 300px)',
			}}
		/>
	)
}
