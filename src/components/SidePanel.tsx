import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react'
import { useAppSelector } from '../store/store'
import { sliceString } from '../lib/utils'
import ThemeSwitch from './ThemeSwitch'
import Button from './ui/button'
import AddWalletDialog from './AddWalletDialog'
import { useContext, useState } from 'react'
import copy from 'copy-to-clipboard'
import { ChartContext } from '../lib/ChartContext'

export default function SidePanel() {
	const { transactions, selectedNode } = useAppSelector((s) => s.wallets)
	const [isNewWalletModalOpen, setIsNewWalletModalOpen] = useState(false)
	const chartRef = useContext(ChartContext)

	const inflows = transactions?.filter((t) => t.receiver_address === selectedNode)
	const outflows = transactions?.filter((t) => t.sender_address === selectedNode)

	function handleExport() {
		const chartInstance = chartRef.current?.getEchartsInstance()
		if (!chartInstance) return

		const dataURL = chartInstance.getDataURL({
			type: 'svg',
			pixelRatio: 2,
			backgroundColor: '#fff',
		})

		const link = document.createElement('a')
		link.href = dataURL
		link.download = `graph_export.svg`
		link.click()
	}

	return (
		<div className="w-[300px] bg-background z-10 border-r border-border h-full relative flex flex-col p-4">
			<ThemeSwitch />
			<div className="text-xs py-5 flex-1">
				{selectedNode ? (
					<>
						<p className="text-sm font-semibold opacity-60 mb-1 my-4">
							Selected wallet
						</p>
						<p className="cursor-pointer" onClick={() => copy(selectedNode)}>
							{selectedNode}
						</p>
					</>
				) : null}

				{inflows?.length > 0 ? (
					<>
						<p className="text-sm font-semibold opacity-60 mb-1 my-4">Inflows</p>
						<ul>
							{inflows?.map((t, i) => (
								<li className="flex items-center gap-2 my-1" key={i}>
									<ArrowBigRightDash className="h-4 w-4 text-green-500 " />
									{sliceString(t.sender_address, 8)} ({t.amount} {t.token_type})
								</li>
							))}
						</ul>
					</>
				) : null}

				{outflows?.length > 0 ? (
					<>
						<p className="text-sm font-semibold opacity-60 mb-1 my-4">Outflows</p>
						<ul>
							{outflows?.map((t, i) => (
								<li className="flex items-center gap-2 my-1" key={i}>
									<ArrowBigLeftDash className="h-4 w-4 text-red-500 " />
									{sliceString(t.receiver_address, 8)} ({t.amount} {t.token_type})
								</li>
							))}
						</ul>
					</>
				) : null}
			</div>

			<Button
				className="w-full rounded-full bg-blue-100 text-blue-500 mb-2"
				onClick={handleExport}
			>
				Export the graph
			</Button>

			<Button className="w-full rounded-full" onClick={() => setIsNewWalletModalOpen(true)}>
				Add new transaction
			</Button>

			{isNewWalletModalOpen ? (
				<AddWalletDialog
					open={isNewWalletModalOpen}
					onClose={() => setIsNewWalletModalOpen(false)}
				/>
			) : null}
		</div>
	)
}
