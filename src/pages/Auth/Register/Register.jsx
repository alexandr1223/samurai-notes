import { Formik } from 'formik';
import React from 'react';
import * as yup from  'yup'
import './register.sass'
import api from '../../../services/api';
import {auth} from '../../../redux/action/Auth/auth';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Login() {

    const dispatch = useDispatch();

    const validationSchema = yup.object().shape({
        email: yup.string().typeError('Должно быть строкой').email('Не является email').required('Обязательное поле'),
        password: yup.string().min(6, 'Пароль должен содержать не меньше 6 символов').required('Обязательное поле'),
        firstName: yup.string(),
        lastName: yup.string()
    })

    const onSubmit = async (data) => {
        console.log(data)
        try {
            await api.auth.registration(data)
            const {data: loginData} = await api.auth.login(data)
            console.log(loginData)
            dispatch(auth(true, loginData))
        } catch (e) {
            if (e.response.status === 422) {
                Object.keys(e.response.data.errors).forEach((key) => {
                    // setStatus(key, {
                    //     type: "manual",
                    //     messeage: e.response.data.errors[key],
                    // });
                    console.log(e.response.data.errors[key])
                });
            }
        } 
    }

    return(
        <div className="register">
            <h1 className="register__title">Регистрация</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: ''
                }}
                validateOnBlur
                onSubmit={values => onSubmit(values)}
                validationSchema={validationSchema}
            >
                {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
                    <div className="register-form">
                        <div className="register-form__item">
                            <label className="register-form__label" htmlFor={`email`}>Логин</label>
                            <input 
                                className="register-form__input"
                                type={`text`}
                                name={`email`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {touched.email && errors.email && <p className='error'>{errors.email}</p>}
                        </div>
                        <div className="register-form__item">
                            <label className="register-form__label" htmlFor={`password`}>Пароль</label>
                            <input 
                                className="register-form__input"
                                type={`password`}
                                name={`password`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {touched.password && errors.password && <p className='error'>{errors.password}</p>}
                        </div>
                        <div className="register-form__item">
                            <label className="register-form__label" htmlFor={`firstName`}>Имя</label>
                            <input 
                                className="register-form__input"
                                type={`text`}
                                name={`firstName`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                            />
                            {touched.firstName && errors.firstName && <p className='error'>{errors.firstName}</p>}
                        </div>
                        <div className="register-form__item">
                            <label className="register-form__label" htmlFor={`lastName`}>Фимилия</label>
                            <input 
                                className="register-form__input"
                                type={`text`}
                                name={`lastName`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                            />
                            {touched.lastName && errors.lastName && <p className='error'>{errors.lastName}</p>}
                        </div>
                        <div className="register-form__nav">
                            <button className="register-form__btn"
                                disabled={!isValid && !dirty}
                                onClick={handleSubmit}
                                type="submit"
                            >
                                Создать аккаунт
                            </button>
                            <div className="register-form__register">
                                Уже есть аккаунт?
                                <NavLink to="/login" activeClassName="sidebar__active">Войти</NavLink>
                            </div>
                        </div>
                    </div>
                )}

            </Formik>
        </div>
    )
}
export default Login;
