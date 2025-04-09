import { EChartsOption } from 'echarts'
import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../lib/store'
import { selectNode } from '../lib/walletsSlice'
import { sliceString } from '../lib/utils'

export default function Visualizer() {
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

	const links = useMemo(() => {
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
		return wallets.map((item, i) => ({
			id: item,
			name: item,
			symbolSize: 80,
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
					color: '#ffffff',
					borderColor: '#3cb2ef',
					borderWidth: 2,
				},
				label: {
					show: true,
					color: '#3cb2ef',
				},
			},
		}))
	}, [wallets])

	const options: EChartsOption = useMemo(() => {
		return {
			series: [
				{
					data: nodes,
					type: 'graph',
					layout: 'force',
					draggable: true,
					roam: true,
					force: {
						edgeLength: 400,
						repulsion: 50,
						gravity: 0.0001,
						layoutAnimation: true,
						friction: 0.5,
					},
					edgeSymbol: ['none', 'arrow'],
					edgeSymbolSize: [0, 8],
					links,
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
					  <strong>From:</strong> ${params.data.from}<br/>
					  <strong>To:</strong> ${params.data.to}
    					`
					}
				},
			},
		}
	}, [])

	const onChartClick = (params) => {
		if (params.dataType === 'node') {
			dispatch(selectNode(params.data.id))
		}
	}

	const onEvents = {
		click: onChartClick,
	}
	return (
		<ReactECharts
			option={options}
			opts={{
				renderer: 'svg',
			}}
			theme={theme}
			onEvents={onEvents}
			style={{
				height: '100%',
			}}
		/>
	)
}
