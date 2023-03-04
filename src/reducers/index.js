const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETED':
            return {
                ...state,
                heroes: state.heroes.filter(elem => elem.id !== action.payload)
            }
        case 'HERO_ADD':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filtersLoadingStatus: 'fetched',
                filters: action.payload
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                 ...state,
                filtersLoadingStatus: 'error'
            }
        case 'CHANGE_ACTIVE_FILTER':
            return {
                ...state,
                activeFilter: action.payload,
            }
        case 'UPDATE_HEROES_BY_FILTER':
            return {
                ...state,
                filteredHeroes: state.activeFilter === 'all' ? state.heroes : state.heroes.filter(({element}) => element === state.activeFilter)
            }
        default: return state
    
    }
}



export default reducer;