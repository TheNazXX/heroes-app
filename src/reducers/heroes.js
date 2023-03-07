import { createReducer } from "@reduxjs/toolkit";
import { heroesFetching, heroesFetched, heroesFetchingError, heroCreated, heroDeleted } from "../actions";

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

const heroesReducer = createReducer(initialState, {
    [heroesFetching]: (state) => {state.heroesLoadingStatus = 'loading'},

    [heroesFetchingError]: (state) => {state.heroesLoadingStatus = 'error'},

    [heroesFetched]: (state, action) => {
        state.heroes = action.payload;
        state.heroesLoadingStatus = 'idle';
    },

    [heroCreated]: (state, action) => {state.heroes.push(action.payload)},
    
    [heroDeleted]: (state, action) => {state.heroes = state.heroes.filter(elem => elem.id !== action.payload)}
}, [], state => state);


// const heroesReducer = createReducer(initialState, builder => {
//     builder
//         .addCase(heroesFetching, (state) => {
//             state.heroesLoadingStatus = 'loading'
//         })
//         .addCase(heroesFetched, (state, action) => {
//             state.heroes = action.payload;
//             state.heroesLoadingStatus = 'idle';
//         })
//         .addCase(heroesFetchingError, (state) => {
//             state.heroesLoadingStatus = 'error';
//         })
//         .addCase(heroDeleted, (state, action) => {
//             state.heroes = state.heroes.filter(elem => elem.id !== action.payload)
//         })
//         .addCase(heroCreated, (state, action) => {
//             state.heroes.push(action.payload)
//         })
//         .addDefaultCase(() => {});
// });

// const heroesReducer = (state = initialState, action) => {
//   switch (action.type) {
//       case 'HEROES_FETCHING':
//           return {
//               ...state,
//               heroesLoadingStatus: 'loading'
//           }
//       case 'HEROES_FETCHED':
//           return {
//               ...state,
//               heroes: action.payload,
//               heroesLoadingStatus: 'idle'
//           }
//       case 'HEROES_FETCHING_ERROR':
//           return {
//               ...state,
//               heroesLoadingStatus: 'error'
//           }
//       case 'HERO_DELETED':
//           return {
//               ...state,
//               heroes: state.heroes.filter(elem => elem.id !== action.payload)
//           }
//       case 'HERO_ADD':
//           return {
//               ...state,
//               heroes: [...state.heroes, action.payload],
//           }
//       default: return state
  
//   }
// }



export default heroesReducer;