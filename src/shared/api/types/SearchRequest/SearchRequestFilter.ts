import { FilterItem, FilterType } from '../Filter'

export interface SearchRequestFilterBase extends FilterItem {
	id: string
	type: FilterType
}

export interface SearchRequestOptions extends SearchRequestFilterBase {
	type: FilterType.OPTION
	optionsIds: string[]
}

export type SearchRequestFilter = SearchRequestOptions[]
