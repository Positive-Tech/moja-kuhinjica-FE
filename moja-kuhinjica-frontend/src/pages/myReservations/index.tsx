import React, { useState, useEffect } from 'react'
import Header from '@/components/header/Header'
import { TabButton } from '@/components/button/TabButton'
import { ReservationItem } from '@/components/reservation/ReservationItem'
import { Footer } from '@/components/footer/Footer'
import Menu from '../../components/mobileMenu'
import { MobileHeader } from '@/components/header/mobileHeader/MobileHeader'
import { MobileFooter } from '@/components/footer/mobileFooter/MobileFooter'
import { DAYS, INDEX_INCREMENT, MOBILE_WIDTH } from '@/constants/constants'
import styles from './MyReservationsPage.module.scss'
import uuid from 'react-uuid'

const FIRST_ELEMENT = 0

const MyReservationsPage = (): JSX.Element => {
    const [active, setActive] = useState<number>(1)
    const [reservationsExist, setReservationsExist] = useState<boolean>(true)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [showMenu, setShowMenu] = useState<boolean>(false)

    const handleWindowResize = (): void => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        setReservationsExist(true)
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize)
        if (windowWidth < MOBILE_WIDTH) setIsMobile(true)
        else setIsMobile(false)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [windowWidth])

    return (
        <div className={styles.colDiv}>
            {showMenu && <Menu closeMenu={() => setShowMenu(false)} />}
            {isMobile ? (
                <MobileHeader handleClick={() => setShowMenu(true)} />
            ) : (
                <Header type="red" selectedButton={FIRST_ELEMENT} />
            )}
            <div
                className={
                    reservationsExist ? styles.container : styles.emptyContainer
                }
            >
                <label
                    className={
                        reservationsExist
                            ? styles.titleLabel
                            : styles.emptyTitleLabel
                    }
                >
                    Moje rezervacije
                </label>
                <label className={styles.infoLabel}>
                    Rezervacije se mogu otkazati do 10 časova
                </label>
                <div className={styles.colDiv1}>
                    <div className={styles.menuRowDiv}>
                        {DAYS.map((day, activeTabIndex) => {
                            return (
                                <TabButton
                                    key={uuid()}
                                    active={
                                        active ===
                                        activeTabIndex + INDEX_INCREMENT
                                    }
                                    onClick={() =>
                                        setActive(
                                            activeTabIndex + INDEX_INCREMENT
                                        )
                                    }
                                    content={day}
                                />
                            )
                        })}
                    </div>
                    <label className={styles.titleLabel}>Februar 4</label>
                    {!reservationsExist && (
                        <div className={styles.rowDiv}>
                            <label className={styles.infoLabel}>
                                Nema rezervacija za ovaj datum.
                            </label>
                        </div>
                    )}
                    {reservationsExist && (
                        <div className={styles.reservationWrapper}>
                            <label className={styles.restaurantLabel}>
                                Restoran Top FOOD 021
                            </label>
                            <label className={styles.reservationLabel}>
                                Rezervacija #234913
                            </label>
                            <ReservationItem />
                            <ReservationItem />
                        </div>
                    )}
                    {reservationsExist && (
                        <div className={styles.reservationWrapper}>
                            <label className={styles.restaurantLabel}>
                                Restoran Top FOOD 021
                            </label>
                            <label className={styles.reservationLabel}>
                                Rezervacija #234913
                            </label>
                            <ReservationItem />
                        </div>
                    )}
                </div>
                {isMobile ? <MobileFooter /> : <Footer />}
            </div>
        </div>
    )
}

export default MyReservationsPage
