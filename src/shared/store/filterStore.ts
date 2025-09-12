import { create } from 'zustand'

import { SearchRequestFilter } from '../api/types/SearchRequest/SearchRequestFilter'

type State = {
	filter: SearchRequestFilter
	setFilter: (f: SearchRequestFilter) => void
	resetFilter: () => void
}

export const useFilterStore = create<State>(set => ({
	filter: [],
	setFilter: f => set({ filter: f }),
	resetFilter: () => set({ filter: [] })
}))
