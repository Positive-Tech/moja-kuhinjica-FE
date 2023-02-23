import React from 'react'
import { useState } from 'react'
import AdminMenu from '../components/menu/AdminMenu'
const Reservations = ():JSX.Element => {
    return (
        <div>
            <AdminMenu selectedButton={1}/>
            <div>Rezervacije</div>
        </div>
    )
}

export default Reservations