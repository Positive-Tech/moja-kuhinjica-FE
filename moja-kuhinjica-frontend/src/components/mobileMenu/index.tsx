import React from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/utils/hooks'
import { userLogout } from '@/reduxStore/reducers/userReducer'
import Image from 'next/image'
import { DropdownMenuButton } from '@/components/button/DropdownMenuButton'
import closeIcon from 'public/static/assets/images/close.svg'
import homeIcon from 'public/static/assets/images/homeIcon.svg'
import reservationIcon from 'public/static/assets/images/reservationIcon.svg'
import aboutUsIcon from 'public/static/assets/images/aboutUsIcon.svg'
import myReservations from 'public/static/assets/images/myReservations.svg'
import editProfile from 'public/static/assets/images/editProfile.svg'
import logoutIcon from 'public/static/assets/images/logout.svg'
import profile from 'public/static/assets/images/profileHeader.svg'
import styles from './Menu.module.scss'
import { routes } from '@/constants/constants'

interface IMenuProps {
    closeMenu: () => void
}

const Menu = ({ closeMenu }: IMenuProps): JSX.Element => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const isAuthorized = useAppSelector(
        ({ auth: { isAuthorized } }) => isAuthorized
    )
    const user = useAppSelector(({ auth: { user } }) => user)

    const navigate = (url: string): void => {
        closeMenu()
        router.push(url)
    }

    const logout = (): void => {
        dispatch(userLogout())
        navigate(routes.HOME_PAGE)
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.closeButtonWrapper}>
                    {isAuthorized && (
                        <div className={styles.userNameWrapper}>
                            <div className={styles.pictureWrapper}>
                                <Image
                                    src={profile}
                                    alt=""
                                    className={styles.profilePicture}
                                />
                            </div>
                            <label className={styles.userName}>
                                {user?.name}&nbsp;
                                {user?.surname}
                            </label>
                        </div>
                    )}
                    <Image src={closeIcon} alt="" onClick={closeMenu} />
                </div>
                <div className={styles.buttonWrapper}>
                    <DropdownMenuButton
                        content="Početna"
                        src={homeIcon}
                        style={styles.button}
                        handleClick={() => navigate(routes.HOME_PAGE)}
                    />
                    <DropdownMenuButton
                        content="Rezerviši"
                        src={reservationIcon}
                        style={styles.button}
                        handleClick={() =>
                            navigate(
                                isAuthorized
                                    ? routes.MEAL_RESERVATION_PAGE
                                    : routes.LOGIN_PAGE
                            )
                        }
                    />
                    {isAuthorized && (
                        <DropdownMenuButton
                            content="Moje rezervacije"
                            src={myReservations}
                            style={styles.button}
                            handleClick={() =>
                                navigate(routes.MEAL_RESERVATION_PAGE)
                            }
                        />
                    )}
                    {isAuthorized && (
                        <DropdownMenuButton
                            content="Izmena profila"
                            src={editProfile}
                            style={styles.button}
                            handleClick={() =>
                                navigate(
                                    `${routes.EDIT_PROFILE_PAGE}/${user?.id}`
                                )
                            }
                        />
                    )}
                    <DropdownMenuButton
                        content="O nama"
                        src={aboutUsIcon}
                        style={styles.button}
                        handleClick={() => navigate(routes.ABOUT_US_PAGE)}
                    />
                    {isAuthorized && (
                        <DropdownMenuButton
                            content="Odjavi se"
                            src={logoutIcon}
                            style={styles.button}
                            handleClick={() => logout()}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Menu
