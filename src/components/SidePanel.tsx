import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react'
import { useAppSelector } from '../lib/store'
import { sliceString } from '../lib/utils'
import ThemeSwitch from './ThemeSwitch'
import Button from './ui/button'

export default function SidePanel() {
	const { transactions, selectedNode } = useAppSelector((s) => s.wallets)

	const inflows = transactions?.filter((t) => t.receiver_address === selectedNode)
	const outflows = transactions?.filter((t) => t.sender_address === selectedNode)

	return (
		<div className="w-[300px] bg-background z-10 border-r border-border h-full absolute flex flex-col p-4">
			<ThemeSwitch />

			<div className="text-xs py-5 flex-1">
				{selectedNode ? (
					<>
						<p className="text-sm font-semibold opacity-60 mb-1 my-4">
							Currently selected
						</p>
						<p>{selectedNode}</p>
					</>
				) : null}

				{inflows?.length > 0 ? (
					<>
						<p className="text-sm font-semibold opacity-60 mb-1 my-4">Inflows</p>
						<ul>
							{inflows?.map((t) => (
								<li className="flex items-center gap-2 my-1">
									<ArrowBigRightDash className="h-4 w-4 text-green-500 " />
									{sliceString(t.sender_address, 10)} ({t.amount} {t.token_type})
								</li>
							))}
						</ul>
					</>
				) : null}

				{outflows?.length > 0 ? (
					<>
						<p className="text-sm font-semibold opacity-60 mb-1 my-4">Outflows</p>
						<ul>
							{outflows?.map((t) => (
								<li className="flex items-center gap-2 my-1">
									<ArrowBigLeftDash className="h-4 w-4 text-red-500 " />
									{sliceString(t.receiver_address, 10)} ({t.amount} {t.token_type}
									)
								</li>
							))}
						</ul>
					</>
				) : null}
			</div>

			<Button className="w-full rounded-full">Add new wallet</Button>
		</div>
	)
}
