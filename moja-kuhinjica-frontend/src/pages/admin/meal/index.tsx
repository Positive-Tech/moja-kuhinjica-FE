import React from 'react'
import { useState } from 'react'
import AdminMenu from '../components/menu/AdminMenu'
import styles from './Meal.module.scss'
const Meal = ():JSX.Element => {
    const [isMobile, setIsMobile] = useState<boolean>(false)
    return (
        <div>
            <AdminMenu selectedButton={2}/>
            <div className={styles.container}>
                <label className={styles.title}>Dodaj novo jelo</label>
            </div>
        </div>
    )
}

export default Meal