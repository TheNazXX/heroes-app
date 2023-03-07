import { createReducer } from "@reduxjs/toolkit"
import { filtersFetching, filtersFetched, filtersFetchingError, changeActiveFilter } from "../actions"

const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
}

const filtersReducer = createReducer(initialState, {
    [filtersFetching]: (state) => {state.filtersLoadingStatus = 'loading'},

    [filtersFetched]: (state, action) => {
        state.filters = action.payload;
        state.filtersLoadingStatus = 'idle';
    },

    [filtersFetchingError]: (state) => {state.filtersLoadingStatus = 'error'},

    [changeActiveFilter]: (state, action) => {state.activeFilter = action.payload}
}, [], state => state);


// const filtersReducer = createReducer(initialState, builder => {
//     builder
//         .addCase(filtersFetching, (state) => {
//             state.filtersLoadingStatus = 'loading';
//         })
//         .addCase(filtersFetched, (state, action) => {
//             state.filters = action.payload;
//             state.filtersLoadingStatus = 'idle';
//         })
//         .addCase(filtersFetchingError, (state) => {
//             state.filtersLoadingStatus = 'error'
//         })
//         .addCase(changeActiveFilter, (state, action) => {
//             state.activeFilter = action.payload
//         })
// })

// const filtersReducer = (state = initialState, action) => {
//   switch (action.type) {
//       case 'FILTERS_FETCHING':
//           return {
//               ...state,
//               filtersLoadingStatus: 'loading'
//           }
//       case 'FILTERS_FETCHED':
//           return {
//               ...state,
//               filtersLoadingStatus: 'fetched',
//               filters: action.payload
//           }
//       case 'FILTERS_FETCHING_ERROR':
//           return {
//                ...state,
//               filtersLoadingStatus: 'error'
//           }
//       case 'CHANGE_ACTIVE_FILTER':
//           return {
//               ...state,
//               activeFilter: action.payload,
//           }
//       default: return state
  
//   }
// }



export default filtersReducer;