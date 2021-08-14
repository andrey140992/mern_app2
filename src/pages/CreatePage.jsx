import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext.js'
import {useMessage} from '../hooks/message.hook.js'
import {useHistory} from 'react-router-dom'



export const CreatePage = () => {
    const history = useHistory() 
    const message = useMessage()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    

    const [form, setForm] = useState({
        name: '',
        surname: '',
        midname: '',
        city: ''
    })

    useEffect(() =>{
        window.M.updateTextFields()
    }, [])

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]:event.target.value});
        
    }

    const postHandler = async () => {
        try {
            
            const data = await request('/api/ditales/add', 'POST', {...form}, {Autorization: `Bearer ${auth.token}`})
            message(data.message)
            console.log(data)
           history.push(`/links/${data.ditales._id}`)
        } catch (error) {
            console.log(error)
        }
    }

    const putHandler = async () => {
        try {
            const data = await request('/api/ditales/put', 'PUT', {...form}, {Autorization: `Bearer ${auth.token}`})
            
            message(data.message)
            console.log(data)
           
        } catch (error) {
            console.log(error)
        }
    }

    const deleteHandler = async () => {
        try {
            const data = await request('/api/ditales/delete', 'DELETE', {...form}, {Autorization: `Bearer ${auth.token}`})
            message(data.message)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    

    return (
           <>
            <h1>Введите ваши данные:</h1>
            <form className="form "
            onSubmit={e => e.preventDefault()}>
                <div className="row">

                     <div className="input-field col s12">
                        <input
                        type="text"
                        name="name"
                        className="validate"
                        onChange={changeHandler}
                        
                        />
                        <label htmlFor="name">Имя</label>
                    </div>

                    <div className="input-field col s12">
                        <input
                        type="text"
                        name="surname"
                        className="validate"
                        onChange={changeHandler}
                        />
                        <label htmlFor="surname">Фамилия</label>
                    </div>

                    <div className="input-field col s12">
                        <input
                        type="text"
                        name="midname"
                        className="validate"
                        onChange={changeHandler}
                        />
                        <label htmlFor="midname">Отчество</label>
                    </div>

                    <div className="input-field col s12">
                        <input
                        type="text"
                        name="city"
                        className="validate"
                        onChange={changeHandler}
                        />
                        <label htmlFor="city">Ваш город</label>
                    </div>

                <div className="row">
                    <button className="wawes-effect wawes-light btn blue"
                    onClick={postHandler}>
                    Отправить
                    </button>
                </div>
                    <div className="row">
                    <button className="wawes-effect wawes-light btn blue"
                    onClick={putHandler}>
                    Обновить
                    </button>
                </div>
                <div className="row">
                    <button className="wawes-effect wawes-light btn blue"
                    onClick={deleteHandler}>
                    Удалить
                    </button>
                </div>
            </div>
         </form>
    </>
    )
}


