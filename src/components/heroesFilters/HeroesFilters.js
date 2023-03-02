
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { filtersFetching, filtersFetched, filtersFetchingError} from "../../actions";
import SpinnerDots from "../spinner/SpinnerDots";

import './heroesFilters.scss';

const HeroesFilters = () => {

    const {filters, filtersLoadingStatus} = useSelector(state => state)
    const {request} = useHttp();
    const dispatch = useDispatch();

    useEffect(() => {
        onRequest();
        // eslint-disable-next-line
    }, []);

    const onRequest = () => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters").then(data => dispatch(filtersFetched(data))).catch(() => dispatch(filtersFetchingError()))
    }

    const loader = filtersLoadingStatus === 'loading' ? <SpinnerDots /> : null
    const elements = filters.map(({label, value, style}, i) => <button key={i} data-filter={value} className={`btn ${style} ${i === 0 ? 'active' : ''}`}>{label}</button>)
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