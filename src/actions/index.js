import { createAction } from "@reduxjs/toolkit";

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then((data) => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError))
}

export const heroesFetching = createAction('HEROES_FETCHING');
export const heroesFetched = createAction('HEROES_FETCHED');
export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');
export const heroDeleted = createAction('HERO_DELETED');
export const heroCreated = createAction('HERO_CREATERD');

export const filtersFetching = createAction('FILTERS_FETCHING');
export const filtersFetched = createAction('FILTERS_FETCHED');
export const filtersFetchingError = createAction('FILTERS_FETCHING_ERROR');
export const changeActiveFilter = createAction('CHANGE_ACTIVE_FILTER');


