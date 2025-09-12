import { useQuery } from '@tanstack/react-query'

import { FilterItem, FilterType } from '@/shared/api/types/Filter'
import filterData from '@/shared/temp/filterData.json'

export const useFilterData = () =>
	useQuery({
		queryKey: ['filterData'],
		queryFn: async (): Promise<{ filterItems: FilterItem[] }> => {
			return {
				filterItems: filterData.filterItems.map(item => ({
					...item,
					type: FilterType.OPTION
				}))
			}
		}
	})
