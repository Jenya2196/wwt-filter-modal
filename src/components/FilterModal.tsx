import { useEffect, useState } from 'react'

import { FilterType } from '@/shared/api/types/Filter'
import {
	SearchRequestFilter,
	SearchRequestOptions
} from '@/shared/api/types/SearchRequest/SearchRequestFilter'
import { useFilterData } from '@/shared/hooks/useFilterData'
import { useFilterStore } from '@/shared/store/filterStore'

import Modal from './Modal'

function FilterModal({
	isOpen,
	onClose
}: {
	isOpen: boolean
	onClose: () => void
}) {
	const { data: filters, isLoading } = useFilterData()
	const { filter, setFilter } = useFilterStore()

	const [localFilter, setLocalFilter] = useState<SearchRequestFilter>(
		filter || []
	)
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	useEffect(() => {
		if (isOpen) setLocalFilter(filter || [])
	}, [filter, isOpen])

	if (isLoading) return <div>Loading...</div>

	const handleApply = () => {
		setIsConfirmOpen(true)
	}

	const confirmApply = () => {
		setFilter(localFilter)
		setIsConfirmOpen(false)
		onClose()
	}

	const cancelApply = () => {
		setIsConfirmOpen(false)
	}

	const toggleOption = (filterId: string, optionId: string) => {
		setLocalFilter(prev => {
			const filterItem = prev.find(f => f.id === filterId)

			if (filterItem) {
				const optionsIds = filterItem.optionsIds.includes(optionId)
					? filterItem.optionsIds.filter(id => id !== optionId)
					: [...filterItem.optionsIds, optionId]

				return prev.map(f => (f.id === filterId ? { ...f, optionsIds } : f))
			} else {
				const filterFromAPI = filters?.filterItems.find(f => f.id === filterId)
				if (!filterFromAPI) return prev

				const newFilter: SearchRequestOptions = {
					id: filterFromAPI.id,
					type: FilterType.OPTION,
					name: filterFromAPI.name,
					description: filterFromAPI.description,
					options: filterFromAPI.options,
					optionsIds: [optionId]
				}
				return [...prev, newFilter]
			}
		})
	}

	return (
		<>
			<Modal
				title="Filter"
				isOpen={isOpen}
				onClose={onClose}
			>
				<Modal.Content>
					{filters?.filterItems.map(item => (
						<div
							key={item.id}
							className="flex flex-col gap-4 text-gray-600"
						>
							<div className="font-medium text-2xl">{item.name}</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{item.options.map(option => (
									<label
										key={option.id}
										className="flex items-center text-center h-6"
									>
										<input
											type="checkbox"
											className="mr-4 h-6 w-6"
											name={option.id}
											checked={localFilter.some(
												f =>
													f.id === item.id && f.optionsIds.includes(option.id)
											)}
											onChange={() => toggleOption(item.id, option.id)}
										/>
										<span className="text-gray-500">{option.name}</span>
									</label>
								))}
							</div>
							<Modal.Line />
						</div>
					))}

					<Modal.Footer>
						<div className="flex items-center justify-center">
							<button
								onClick={handleApply}
								className="rounded-2xl w-[186px] h-[64px] p-2 bg-[#FF5F00] text-white font-semibold text-base"
							>
								Apply
							</button>
						</div>
					</Modal.Footer>
				</Modal.Content>
			</Modal>

			{/* Confirm Modal */}
			<Modal
				title="Do you want to apply new filter"
				isOpen={isConfirmOpen}
				onClose={cancelApply}
				className="flex flex-col justify-between"
			>
				<div className="relative top-11/12 flex justify-center gap-6 h-full">
					<button
						onClick={cancelApply}
						className="w-[280px] h-16 rounded-2xl border border-gray-300 text-gray-600"
					>
						Cancel
					</button>
					<button
						onClick={confirmApply}
						className="w-[280px] h-16 rounded-2xl bg-[#FF5F00] text-white font-semibold"
					>
						Confirm
					</button>
				</div>
			</Modal>
		</>
	)
}

export default FilterModal
