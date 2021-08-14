import React from 'react'

export const DitalesCard = ( {ditales} ) => {
    
    return(
        <>
            <h2>Данные пользователя:</h2>
            <p>Имя:  { ditales.ditales.name} </p>
            <p>Фамилия:  { ditales.ditales.surname} </p>
            <p>Отчество:  { ditales.ditales.midname} </p>
            <p>Город проживания:  { ditales.ditales.city} </p>
        </>

        
    )   
    
}