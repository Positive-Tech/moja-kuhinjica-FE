import React from 'react'
import { useState } from 'react'
import AdminMenu from '../components/menu/AdminMenu'
const CreateMenu = ():JSX.Element => {
    return (
        <div>
            <AdminMenu selectedButton={3}/>
            <div>Rezervacije</div>
        </div>
    )
}

export default CreateMenu