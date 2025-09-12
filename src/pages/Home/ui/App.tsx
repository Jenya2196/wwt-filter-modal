import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterStore } from '@/shared/store/filterStore'
import FilterModal from '@components/FilterModal'
import Button from '@components/UI/Button'

export const App = () => {
	const { t } = useTranslation()
	const [open, setOpen] = useState<boolean>(false)
	const { filter } = useFilterStore()

	return (
		<>
			<header className="w-full flex flex-col items-center gap-3">
				<h1 className="text-6xl text-gray-600">{t('winWinTravel')}</h1>
				<Button onClick={() => setOpen(true)}>{t('filters')}</Button>
			</header>

			<main className="flex justify-center p-4 ">
				<section className="max-w-3xl p-4 bg-gray-100 rounded text-sm text-gray-700 overflow-auto">
					<h2>{t('selectedFilters')}</h2>
					<pre>{JSON.stringify(filter, null, 2)}</pre>
				</section>
			</main>

			<FilterModal
				onClose={() => setOpen(false)}
				isOpen={open}
			/>
		</>
	)
}
