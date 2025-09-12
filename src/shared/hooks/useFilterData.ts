import { useQuery } from '@tanstack/react-query'

import { FilterType } from '@/shared/api/types/Filter'
import { FilterItem } from '@/shared/api/types/Filter'
import filterData from '@/shared/temp/filterData.json'

export const useFilterData = () =>
	useQuery({
		queryKey: ['filterData'],
		queryFn: async (): Promise<{ filterItems: FilterItem[] }> => {
			return {
				filterItems: filterData.filterItems.map(f => ({
					...f,
					type: FilterType.OPTION
				}))
			}
		}
	})
