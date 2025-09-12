import { useState } from 'react'

import FilterModal from '@/components/FilterModal'
import { useFilterStore } from '@/shared/store/filterStore'

export const App = () => {
	const [open, setOpen] = useState<boolean>(false)
	const { filter } = useFilterStore() // глобальный стейт фильтров

	return (
		<>
			<section className="w-full h-dvh flex flex-col items-center justify-center">
				<h1 className="text-6xl text-gray-600 mb-12">
					WinWinTravel frontend test task
				</h1>
				<button
					onClick={() => setOpen(true)}
					className="p-2 bg-blue-500 rounded hover:bg-blue-600 mb-6"
				>
					Open Filters
				</button>

				{/* Отображение выбранных фильтров для дебага */}
				<div className="w-3/4 max-w-3xl p-4 bg-gray-100 rounded text-sm text-gray-700 overflow-auto">
					<pre>{JSON.stringify(filter, null, 2)}</pre>
				</div>
			</section>

			<FilterModal
				onClose={() => setOpen(false)}
				isOpen={open}
			/>
		</>
	)
}
