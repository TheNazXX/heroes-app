import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from '../../hooks/http.hook'
import { useDispatch, useSelector } from 'react-redux';
import { addHero, updateHeroesByFilter } from '../../actions';
import SpinnerDots from '../spinner/SpinnerDots';

const HeroesAddForm = () => {

    const {request} = useHttp();
    const dispatch = useDispatch();
    const {filters} = useSelector(state => state);

    const onSubmit = (values, {resetForm}) => {
        resetForm();
        const newObj = {id: uuidv4(), ...values};
        request("http://localhost:3001/heroes", 'POST',JSON.stringify(newObj)).then(() => heroAdded(newObj)).catch(() => alert('Что-то пошло не так'));
    };

    const heroAdded = (hero) => {
        dispatch(addHero(hero));
        dispatch(updateHeroesByFilter());
    };

    const renderFilters = (arr) => {
        return arr.map(({label, value}) => {
            return label === 'Все' ? null : <option key={label} value={value}>{label}</option>
        });
    };

    return (
        <Formik
            initialValues={{
                name: '',
                description: '',
                element: ''

            }}
            validationSchema = {Yup.object({
                name: Yup.string().min(3, 'Минимум 3 символа!').required('Обязательное поле!'),
                description: Yup.string().min(3, 'Минимум 3 символа!').required('Обязательное поле!'),
                element: Yup.string().required('Выберите элемент!')
            })}
            onSubmit = {onSubmit}
        >
            {({errors, touched}) => {
        
                const renderStyles = (e, t) => {
                    if(e && t){
                        return 'is-invalid'
                    }else if(t && !e){
                        return 'is-valid'
                    }
                }

                return (
                    <Form className="border p-4 shadow-lg rounded">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                            <Field
                                type="text" 
                                name="name" 
                                className={`form-control ${renderStyles(errors.name, touched.name)}`}
                                id="name" 
                                placeholder="Как меня зовут?"/>
                        </div>
                        

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label fs-4">Описание</label>
                            <Field
                                as="textarea"
                                name="description" 
                                className={`form-control ${renderStyles(errors.description, touched.description)}`}
                                id="description" 
                                placeholder="Что я умею?"
                                style={{"height": '130px'}}/>
                        </div>

                        {filters.length === 0 ? <SpinnerDots/> : <div className="mb-3">
                            <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                            <Field
                                as="select"
                                className={`form-control ${renderStyles(errors.element, touched.element)}`}
                                id="element" 
                                name="element"
                                >
                                <option value=''>Я владею элементом...</option>
                                {renderFilters(filters)}
                            </Field>
                        </div>}

                        <button type="submit" className="btn btn-primary">Создать</button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default HeroesAddForm;