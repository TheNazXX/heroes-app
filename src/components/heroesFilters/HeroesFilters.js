import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { filtersFetching, filtersFetched, filtersFetchingError, changeActiveFilter, fetchFilters } from "../../actions";
import SpinnerDots from "../spinner/SpinnerDots";

import './heroesFilters.scss';

const HeroesFilters = () => {

    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filtersReducer)
    const {request} = useHttp();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters(request))
        // onRequest();
        // eslint-disable-next-line
    }, []);

    // FAKE SERVER //

    // const onRequest = () => {
    //     dispatch(filtersFetching());
    //     request("http://localhost:3001/filters").then(data => dispatch(filtersFetched(data))).catch(() => dispatch(filtersFetchingError()))
    // };

    const changeFilter = (e) => {
        const filter = e.target.getAttribute('data-filter');
        dispatch(changeActiveFilter(filter));
    };

    const loader = filtersLoadingStatus === 'loading' ? <SpinnerDots /> : null
    const error = filtersLoadingStatus === 'error' ? <span><b>Что-то пошло не так...</b></span>: null;

    const elements = !(loader || error) ? filters.map(({label, value, style}, i) => <button
        onClick={changeFilter}
        key={i}
        data-filter={value}
        className={`btn ${style} ${value === activeFilter ? 'active' : ''}`}>{label}
    </button>) : null;



    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {loader}
                    {elements}
                    {error}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;