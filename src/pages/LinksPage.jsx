import React, {useState, useEffect, useContext, useCallback} from 'react'
import { AuthContext } from '../context/AuthContext.js'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/Loader'
import {DitalesCard} from '../components/DitalesCard.js'
import {useParams} from 'react-router-dom'

export const LinksPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [ditales, setDitales] = useState(null)
    const ditalesId = useParams().id
    

    const getDitales = useCallback(async () => {
        try{
            
        const fetched = await request(`/api/ditales/${ditalesId}`, 'GET', null, {Autorization: `Bearer ${token}`})
        
        setDitales(fetched)
       
    }catch(e){console.log(e)}
    }, [token, request, ditalesId])

    useEffect(() => {
        getDitales()
        
    }, [getDitales])

    if(loading){
        return <Loader/>
    }
    console.log(ditales)
    return (
        
        <>
         
           { !loading && ditales && <DitalesCard ditales={ditales}/>}
                                                 
        </>

    )
}