import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Header from '@/components/header/Header'
import { HomePageButton } from '@/components/button/HomePageButton'
import { MenuItem } from '@/components/menu/MenuItem'
import { Footer } from '@/components/footer/Footer'
import { LoginModal } from '@/components/modal/login/LoginModal'
import { TabButton } from '@/components/button/TabButton'
import { SignUpModal } from '@/components/modal/signUp/SignUpModal'
import { SuccessNotificationModal } from '@/components/modal/notification/SuccessNotificationModal'
import { MobileFooter } from '@/components/footer/mobileFooter/MobileFooter'
import Menu from 'src/components/mobileMenu'
import { useAppDispatch, useAppSelector } from '@/utils/hooks'
import { loadUser } from '@/reduxStore/reducers/userReducer'
import { PasswordForgettingModal } from '@/components/modal/passwordForgetting/PasswordForgettingModal'
import { PasswordResettingModal } from '@/components/modal/passwordReset/PasswordResettingModal'
import {
    DAYS,
    INDEX_INCREMENT,
    MOBILE_WIDTH,
    routes,
} from 'src/constants/constants'
import styles from 'src/styles/Home.module.scss'
import scrollArrowIcon from 'public/static/assets/images/scrollArrow.svg'
import burgerMenuIcon from 'public/static/assets/images/burgerMenu.svg'
import RestaurantService, { IMeal, IMenu } from '@/service/Restaurant.service'
import uuid from 'react-uuid'

const HEADER_TYPE = 'main'
const NOTIFICATION_MODAL_TYPE = 'registration'

const Home = (): JSX.Element => {
    const today = new Date(Date.now())
    const [active, setActive] = useState<number>(today.getDay())
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
    const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false)
    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [showPasswordForgettingModal, setShowPasswordForgettingModal] =
        useState<boolean>(false)
    const [showPasswordResettingModal, setShowPasswordResettingModal] =
        useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [userEmail, setUserEmail] = useState<string>('')
    const [resetPasswordMessage, setResetPasswordMessage] = useState<string>('')
    const [allMenus, setAllMenus] = useState<IMenu[]>([])
    const [selectedMenu, setSelectedMenu] = useState<IMenu>()

    const dispatch = useAppDispatch()
    const isAuthorized = useAppSelector(
        ({ auth: { isAuthorized } }) => isAuthorized
    )
    const router = useRouter()
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isAuthorized) dispatch(loadUser())
    }, [isAuthorized])

    useEffect(() => {
        fetchMenus()
    }, [])

    useEffect(() => {
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize)
        if (windowWidth < MOBILE_WIDTH) setIsMobile(true)
        else setIsMobile(false)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [windowWidth])

    const handleClick = (): void => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleWindowResize = (): void => {
        setWindowWidth(window.innerWidth)
    }

    const handleSignUpClick = (): void => {
        if (isMobile) router.push(routes.REGISTRATION_PAGE)
        else setShowSignUpModal(true)
    }

    const handleLoginClick = (): void => {
        if (isMobile) router.push(routes.LOGIN_PAGE)
        else setShowLoginModal(true)
    }

    const showNotificationModal = (email: string): void => {
        setUserEmail(email)
        setShowNotification(true)
    }

    const fetchMenus = (): void => {
        RestaurantService.fetchWeeklyMenus()
            .then((res) => {
                setAllMenus(res.data)
                setSelectedMenu(res.data[active - INDEX_INCREMENT])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className={styles.colDiv}>
            {showMenu && <Menu closeMenu={() => setShowMenu(false)} />}
            <Header
                type={HEADER_TYPE}
                selectedButton={INDEX_INCREMENT}
                openLoginModal={setShowLoginModal}
            />
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <Image
                        src={burgerMenuIcon}
                        alt=""
                        className={styles.menuIcon}
                        onClick={() => setShowMenu(true)}
                    />
                    <label className={styles.title}>dunda</label>
                    <label className={styles.content}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing.
                    </label>
                    {!isAuthorized && (
                        <div className={styles.buttonWrapper}>
                            <HomePageButton
                                content="Registrujte se"
                                onClick={handleSignUpClick}
                            />
                            <HomePageButton
                                content="Ulogujte se"
                                onClick={handleLoginClick}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.scrollDiv}>
                    <div className={styles.labelForScrollWrapper}>
                        <label
                            className={styles.labelForScroll}
                            onClick={handleClick}
                        >
                            Ponuda
                        </label>
                        <Image
                            className={styles.labelForScrollIcon}
                            src={scrollArrowIcon}
                            alt=""
                            onClick={handleClick}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.menuWrapper} ref={ref}>
                <div className={styles.menuColDiv}>
                    <div className={styles.restaurantTitleWrapper}>
                        <label className={styles.restaurantTitle}>
                            Restoran Top FOOD 021
                        </label>
                        <label
                            onClick={() =>
                                router.push(routes.RESTAURANT_PROFILE_PAGE)
                            }
                            className={styles.restaurantInfoLabel}
                        >
                            opšte informacije
                        </label>
                    </div>
                    <label className={styles.titleLabel}>
                        {`Dnevni meni - ${today.toLocaleDateString()}`}
                    </label>
                    <div className={styles.menuRowDiv}>
                        {DAYS.map((day, activeTabIndex) => {
                            return (
                                <TabButton
                                    key={uuid()}
                                    active={
                                        active ===
                                        activeTabIndex + INDEX_INCREMENT
                                    }
                                    onClick={() => {
                                        setActive(
                                            activeTabIndex + INDEX_INCREMENT
                                        )
                                        setSelectedMenu(
                                            allMenus[activeTabIndex]
                                        )
                                    }}
                                    content={day}
                                />
                            )
                        })}
                    </div>
                    <div className={styles.menuGridDiv}>
                        {selectedMenu &&
                            selectedMenu.meals.map(
                                ({ id, title, description, price }: IMeal) => {
                                    return (
                                        <MenuItem
                                            key={id}
                                            title={title}
                                            description={description}
                                            price={price}
                                        />
                                    )
                                }
                            )}
                    </div>
                </div>
            </div>
            {isMobile ? <MobileFooter /> : <Footer />}
            <LoginModal
                modalIsOpen={showLoginModal}
                closeModal={() => setShowLoginModal(false)}
                openPasswordForgettingModal={() =>
                    setShowPasswordForgettingModal(true)
                }
            />
            <SignUpModal
                modalIsOpen={showSignUpModal}
                closeModal={() => setShowSignUpModal(false)}
                openNotificationModal={(email) => showNotificationModal(email)}
            />
            <SuccessNotificationModal
                modalIsOpen={showNotification}
                closeModal={() => setShowNotification(false)}
                type={NOTIFICATION_MODAL_TYPE}
                title=""
                buttonText="zatvori"
                email={userEmail}
            />
            <PasswordForgettingModal
                modalIsOpen={showPasswordForgettingModal}
                closeModal={() => setShowPasswordForgettingModal(false)}
                openNotificationModal={() =>
                    setShowPasswordResettingModal(true)
                }
                setMessage={setResetPasswordMessage}
                setUserEmail={setUserEmail}
            />
            <PasswordResettingModal
                modalIsOpen={showPasswordResettingModal}
                closeModal={() => setShowPasswordResettingModal(false)}
                infoContent={resetPasswordMessage}
                email={userEmail}
            />
        </div>
    )
}

export default Home
