import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useAppDispatch } from '../store/store'
import { addNewNode } from '../store/walletsSlice'
import Button from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'

const FormSchema = z.object({
	sender_address: z.string().min(1, { message: 'This field is required' }),
	receiver_address: z.string().min(1, { message: 'This field is required' }),
	amount: z.string().min(1, { message: 'This field is required' }),
	token_type: z.string().min(1, { message: 'This field is required' }),
})

export default function AddWalletDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
	const dispatch = useAppDispatch()

	const form = useForm({
		defaultValues: {
			sender_address: '',
			receiver_address: '',
			amount: '',
			token_type: '',
		},
		validators: {
			onSubmit: FormSchema,
		},
		onSubmit: ({ value }) => {
			const newNode = {
				sender_address: value.sender_address,
				receiver_address: value.receiver_address,
				amount: value.amount,
				date: new Date().toISOString(),
				token_type: value.token_type,
				entity_name: 'Unknown',
			}
			dispatch(addNewNode(newNode))
			onClose()
		},
	})
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add new transaction</DialogTitle>

					<form
						action=""
						onSubmit={(e) => {
							e.preventDefault()
							e.stopPropagation()
							form.handleSubmit()
						}}
						className="space-y-4 mt-3"
					>
						<form.Field name="sender_address">
							{(field) => (
								<div>
									<Input
										placeholder="Sender Address"
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									{field?.state.meta.errors ? (
										<p className="text-xs text-red-500 mt-1">
											{field?.state?.meta?.errors?.[0]?.message}
										</p>
									) : null}
								</div>
							)}
						</form.Field>

						<form.Field name="receiver_address">
							{(field) => (
								<div>
									<Input
										placeholder="Receiver Address"
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									{field?.state.meta.errors ? (
										<p className="text-xs text-red-500 mt-1">
											{field?.state?.meta?.errors?.[0]?.message}
										</p>
									) : null}
								</div>
							)}
						</form.Field>

						<form.Field name="amount">
							{(field) => (
								<div>
									<Input
										placeholder="Amount"
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									{field?.state.meta.errors ? (
										<p className="text-xs text-red-500 mt-1">
											{field?.state?.meta?.errors?.[0]?.message}
										</p>
									) : null}
								</div>
							)}
						</form.Field>

						<form.Field name="token_type">
							{(field) => (
								<div>
									<Input
										placeholder="Token Type"
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									{field?.state.meta.errors ? (
										<p className="text-xs text-red-500 mt-1">
											{field?.state?.meta?.errors?.[0]?.message}
										</p>
									) : null}
								</div>
							)}
						</form.Field>

						<Button className="w-full">Submit</Button>
					</form>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
