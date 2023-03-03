import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { filtersFetching, filtersFetched, filtersFetchingError, changeActiveFilter, updateHeroesByFilter} from "../../actions";
import SpinnerDots from "../spinner/SpinnerDots";

import './heroesFilters.scss';

const HeroesFilters = () => {

    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state)
    const {request} = useHttp();
    const dispatch = useDispatch();


    useEffect(() => {
        onRequest();
        // eslint-disable-next-line
    }, []);

    const onRequest = () => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters").then(data => dispatch(filtersFetched(data))).catch(() => dispatch(filtersFetchingError()))
    };

    const changeFilter = (e) => {
        const filter = e.target.getAttribute('data-filter');
        dispatch(changeActiveFilter(filter));
        dispatch(updateHeroesByFilter());
    };

    const loader = filtersLoadingStatus === 'loading' ? <SpinnerDots /> : null

    const elements = filters.map(({label, value, style}, i) => <button
        onClick={changeFilter}
        key={i}
        data-filter={value}
        className={`btn ${style} ${value === activeFilter ? 'active' : ''}`}>{label}
    </button>);

    const error = filtersLoadingStatus === 'error' ? <span><b>Что-то пошло не так...</b></span>: null;

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