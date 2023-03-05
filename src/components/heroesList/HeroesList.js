import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';
import { createSelector } from 'reselect';

const HeroesList = () => {

    const dispatch = useDispatch();
    const {request} = useHttp();

    const filteredHeroesSelector = createSelector(
        state => state.filtersReducer.activeFilter,
        state => state.heroesReducer.heroes,
        (filter, heroes) => {
            if(filter === 'all')return heroes;
            return heroes.filter(({element}) => element === filter)
        }
    );

    const {heroesLoadingStatus} = useSelector(state => state.heroesReducer);
    const filteredHeroes = useSelector(filteredHeroesSelector)
    
    useEffect(() => {
        dispatch('HEROES_FETCHING');
        request("http://localhost:3001/heroes")
            .then(data => heroesOnLoaded(data))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const heroesOnLoaded = (data) => {
        dispatch(heroesFetched(data));
    };

    const heroWasDeleted = (id) => {
        dispatch(heroDeleted(id));
    };

    const onDeleteHero = (id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE').then(() => heroWasDeleted(id)).catch(() => alert('Что-то пошло не так...'))
    };

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    };

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <CSSTransition classNames='heroes__text' timeout={1}>
                <h5 className="text-center heroes__text">Героев пока нет</h5>
            </CSSTransition>
        };

        return arr.map(({id, ...props}) => {
            return (
            <CSSTransition key={id} classNames='heroes__item' timeout={750}>
                <HeroesListItem key={id} {...props} onDeleteHero={() => onDeleteHero(id)}/>
            </CSSTransition>
            );
        });
    };

    const elements = renderHeroesList(filteredHeroes);

    return (
        <ul className='heroes__list'>
            <TransitionGroup component={null}>
                {elements}
            </TransitionGroup>
        </ul>
    );
};

export default HeroesList;