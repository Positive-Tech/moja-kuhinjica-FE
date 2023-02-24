import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './AdminMenu.module.scss'
import profileIcon from '../../../../../public/static/assets/images/profileHeader.svg'
import { AdminMenuButton } from '../../components/button/AdminMenuButton'
import logout from '../../../../../public/static/assets/images/logout.svg'

interface IAdminMenuProps {
    selectedButton: number
    // openLoginModal?: (param: boolean) => void
}
const AdminMenu = ({
    selectedButton,
}: IAdminMenuProps):JSX.Element => {
    const [active, setActive] = useState<number>(selectedButton)
    const [numberOfReservations, setNumberOfReservations] = useState<number>(6)
    const router = useRouter()

    const handleClick = (buttonNumber: number, url: string): void => {
        setActive(buttonNumber)
        router.push(url)
    }
    return (
            <div className={styles.sidebar}>
                <div className={styles.profileWrapper}>
                    <Image
                        src={profileIcon}
                        alt=""
                        className={styles.profileIcon}
                    />
                    <label className={styles.ownerName}>Pera Peric</label>
                    <br></br>
                    <label className={styles.ownerTitle}>TopFood021</label>
                </div>
                <div className={styles.menuOptions}>

                    <AdminMenuButton
                        active={active === 1}
                        onClick={() => handleClick(1, '/admin/reservations')}
                        content="Rezervacije"
                    />
                    <button className={styles.numberOfReservations}>{numberOfReservations}</button>
                    <AdminMenuButton
                        active={active === 2}
                        onClick={() => handleClick(2, '/admin/meal')}
                        content="Jela"
                    />
                    <AdminMenuButton
                        active={active === 3}
                        onClick={() => handleClick(3, '/admin/createMenu')}
                        content="Kreiraj meni"
                    />
                    <AdminMenuButton
                        active={active === 4}
                        onClick={() => handleClick(4, '/admin/restaurantProfile')}
                        content="Profil restorana"
                    />
                </div>
                <div className={styles.logoutContainer}>
                <Image src={logout} alt="" className={styles.icon} />
                <button
                    className={styles.logoutButton}
                >
                    Odjavi se
                </button>
            </div>
            </div>
    )
}

export default AdminMenu