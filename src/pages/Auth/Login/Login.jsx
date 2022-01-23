import { Formik } from 'formik';
import React from 'react';
import * as yup from  'yup'
import './login.sass'
import api from '../../../services/api';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { isLoaded } from '../../../redux/action/Auth/auth';
import { NavLink } from 'react-router-dom';

function Login() {

    const dispatch = useDispatch();

    const validationSchema = yup.object().shape({
        email: yup.string().typeError('Должно быть строкой').email('Не является email').required('Обязательное поле'),
        password: yup.string().min(6, 'Пароль должен содержать не меньше 6 символов').required('Обязательное поле'),
    })

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const {data: loginData} = await api.auth.login(data)
            
            if (loginData) {
                dispatch(isLoaded(true))
                Cookies.set("auth-token", loginData.token)
            } else {
                dispatch(isLoaded(false))
                Cookies.remove('auth-token')
            }
            console.log(loginData)
            console.log(Cookies.get('auth-token'))
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
        <div className="login">
            <h1 className="login__title">Вход</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validateOnBlur
                onSubmit={values => onSubmit(values)}
                validationSchema={validationSchema}
            >
                {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
                    <div className="login-form">
                        <div className="login-form__item">
                            <label className="login-form__label" htmlFor={`email`}>Логин</label>
                            <input 
                                className="login-form__input"
                                type={`text`}
                                name={`email`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {touched.email && errors.email && <p className='error'>{errors.email}</p>}
                        </div>
                        <div className="login-form__item">
                            <label className="login-form__label" htmlFor={`password`}>Пароль</label>
                            <input 
                                className="login-form__input"
                                type={`text`}
                                name={`password`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {touched.password && errors.password && <p className='error'>{errors.password}</p>}
                        </div>
                        <div className="login-form__nav">
                            <button className="login-form__btn"
                                disabled={!isValid && !dirty}
                                onClick={handleSubmit}
                                type="submit"
                            >
                                Вход
                            </button>
                            <div className="login-form__register">
                                Нет аккаунта, 
                                <NavLink to="/register" activeClassName="sidebar__active">зарегистрироваться</NavLink>
                            </div>
                        </div>
                    </div>
                )}

            </Formik>
        </div>
    )
}
export default Login;
