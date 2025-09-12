import { useQuery } from '@tanstack/react-query'

import { FilterType } from '@/shared/api/types/Filter'
import { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'
import filterData from '@/shared/temp/filterData.json'

export const useFilterData = () =>
	useQuery({
		queryKey: ['filterData'],
		queryFn: async () => {
			return {
				filterItems: filterData.filterItems.map(f => ({
					...f,
					type: FilterType.OPTION
				}))
			} as { filterItems: SearchRequestFilter }
		}
	})
