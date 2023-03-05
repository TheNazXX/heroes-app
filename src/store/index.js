import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import heroesReducer from '../reducers/heroes';
import filtersReducer from '../reducers/filters';

const stringMiddleWare = (store) => (next) => (action) => {
   if(typeof action === 'string'){
      return next({
         type: action
      });
   };
   return next(action);
}

// const enhancer = (createStore) => (...args) => {
//    const store = createStore(...args);

//    const oldDispatch = store.dispatch;
//    store.dispatch = (action) => {
//       if(typeof action === 'string'){
//          return oldDispatch({
//             type: action
//          });
//       };
//       return oldDispatch(action);
//    };

//    return store;
// };

const store = createStore(
   combineReducers({heroesReducer, filtersReducer}),
   compose( applyMiddleware(ReduxThunk, stringMiddleWare))
);

export default store;

