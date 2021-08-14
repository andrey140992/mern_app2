import React, {useState, useEffect, useContext} from 'react'
import  {useHttp}  from '../hooks/http.hook.js'
import {useMessage} from '../hooks/message.hook.js'
import { AuthContext } from '../context/AuthContext.js'

export const AuthPage = () => {
    const auth =  useContext(AuthContext)
    const message = useMessage()
   const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState({
        email: '', 
        password: ''
    })

    useEffect(() => { 

        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() =>{
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
            console.log('Data', data)
        } catch(e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
            console.log('Data', data)
        } catch(e) {}
    }

    return (
        <div>
            <div className="row">
               <div className="col s6 offset-s3">
                   <h1>Service № 1</h1>
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Авторизация</span>
                            <div>

                                <div className="input-field ">
                                    <input
                                        placeholder="Введите Email"
                                        id="email"
                                        type="text"
                                        name="email"
                                        className="yellow-input"
                                        onChange={changeHandler} />
                                    <label htmlFor="email">Email</label>
                                </div>

                                <div className="input-field ">
                                    <input
                                        placeholder="Введите пароль"
                                        id="password"
                                        type="password"
                                        name="password"
                                        className="yellow-input"
                                        onChange={changeHandler} />
                                    <label htmlFor="password">Password</label>
                                </div>

                              </div>  
                            </div>
                         <div className="card-action">
                           <button 
                            className="btn yellow darken-4"
                            style ={{marginRight: 10}}
                            onClick={loginHandler}
                            disabled={loading}
                            >Войти</button>
                           <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                            >Регистрация</button>
                        </div>
                    </div>
               </div>
            </div>       
        </div>

    )
}