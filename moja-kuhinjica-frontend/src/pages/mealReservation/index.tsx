import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Header from '@/components/header/Header'
import { TabButton } from '@/components/button/TabButton'
import { Footer } from '@/components/footer/Footer'
import { Title } from '@/components/label/Title'
import { CartItem } from '@/components/cart/CartItem'
import { RegularButton } from '@/components/button/RegularButton'
import { Text } from '@/components/label/Text'
import { SuccessNotificationModal } from '@/components/modal/notification/SuccessNotificationModal'
import { MobileHeader } from '@/components/header/mobileHeader/MobileHeader'
import Menu from '../../components/mobileMenu'
import { MobileFooter } from '@/components/footer/mobileFooter/MobileFooter'
import { DAYS, MOBILE_WIDTH, routes } from '@/constants/constants'
import styles from './MealReservation.module.scss'
import cartIcon from 'public/static/assets/images/cart.svg'
import RestaurantService, {
    ICartItem,
    IMeal,
    IMenu,
} from '@/service/Restaurant.service'
import { MenuItem } from '@/components/menu/MenuItem'
import { useAppDispatch, useAppSelector } from '@/utils/hooks'
import { addItemToCart } from '@/reduxStore/reducers/restaurantReducer'
import uuid from 'react-uuid'
import { Oval } from 'react-loader-spinner'

const ORDERING = 'ordering'
const INITIAL_MEAL_AMOUNT = 1
const MealReservation = (): JSX.Element => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector(
        ({ restaurant: { cartItems } }) => cartItems
    )
    const today = new Date(Date.now())
    const [active, setActive] = useState<number>(today.getDay())
    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [showCart, setShowCart] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [menusForWeek, setMenusForWeek] = useState<IMenu[]>([])
    const [menuForDay, setMenuForDay] = useState<IMenu>()

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

    const isCartEmpty = (): boolean => !cartItems.length

    const isItemInCart = (mealId: number): boolean =>
        !!cartItems.find((item) => item.meal.id === mealId)

    const fetchMenus = (): void => {
        setIsLoading(true)
        RestaurantService.fetchWeeklyMenus()
            .then((res) => {
                setMenusForWeek(res.data)
                setMenuForDay(res.data[active - 1])
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
    }

    const addToCart = (meal: IMeal): void => {
        dispatch(addItemToCart({ meal: meal, amount: INITIAL_MEAL_AMOUNT }))
    }

    const handleWindowResize = (): void => {
        setWindowWidth(window.innerWidth)
    }

    const getTotalPrice = (): number => {
        let totalPrice = 0
        cartItems.forEach(
            (item) => (totalPrice += item.meal.price * item.amount)
        )
        return totalPrice
    }
    return (
        <div className={styles.colDiv}>
            {showMenu && <Menu closeMenu={() => setShowMenu(false)} />}
            {isMobile ? (
                <MobileHeader handleClick={() => setShowMenu(true)} />
            ) : (
                <Header type="red" selectedButton={2} />
            )}
            <div
                className={
                    menuForDay ? styles.container : styles.emptyMenuContainer
                }
            >
                <div
                    className={
                        menuForDay
                            ? styles.restaurantTitleWrapper
                            : styles.emptyMenuTitleWrapper
                    }
                >
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
                <div className={styles.menuDiv}>
                    <div className={styles.menuColDiv}>
                        <div className={styles.menuRowDiv}>
                            {DAYS.map((day, activeTabIndex) => {
                                return (
                                    <TabButton
                                        key={uuid()}
                                        active={active === activeTabIndex + 1}
                                        onClick={() => {
                                            setActive(activeTabIndex + 1)
                                            setMenuForDay(
                                                menusForWeek[activeTabIndex]
                                            )
                                        }}
                                        content={day}
                                    />
                                )
                            })}
                        </div>
                        {isLoading && (
                            <div className={styles.loadingBarWrapper}>
                                <Oval
                                    height={70}
                                    width={70}
                                    color="#c10016"
                                    wrapperStyle={{}}
                                    wrapperClass={styles.spinner}
                                    visible={true}
                                    ariaLabel="oval-loading"
                                    secondaryColor="#c10016"
                                    strokeWidth={4}
                                    strokeWidthSecondary={4}
                                />
                            </div>
                        )}
                        {menuForDay && !isLoading && (
                            <div className={styles.grid}>
                                {menuForDay.meals.map((meal) => {
                                    return (
                                        <MenuItem
                                            key={meal.id}
                                            type={ORDERING}
                                            title={meal.title}
                                            description={meal.description}
                                            price={meal.price}
                                            handleClick={() => addToCart(meal)}
                                            buttonIsActive={
                                                !isItemInCart(meal.id)
                                            }
                                        />
                                    )
                                })}
                            </div>
                        )}
                        {!isLoading && !menuForDay && (
                            <div className={styles.emptyMenuDiv}>
                                <Text
                                    content={`Dnevni meni za ${today.toLocaleDateString()} još uvek nije
                                        objavljen.`}
                                    style={styles.emptyMenuLabel}
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.cartContainer}>
                        <div className={styles.cartWrapper}>
                            {isCartEmpty() && (
                                <div className={styles.emptyCartDiv}>
                                    <Title
                                        content="korpa"
                                        style={styles.cartTitle}
                                    />
                                    <Text
                                        content="Vaša korpa je prazna, rezervišite jelo iz dnevnog menija."
                                        style={styles.emptyCartLabel}
                                    />
                                </div>
                            )}
                            {!isCartEmpty() && (
                                <div className={styles.cartDiv}>
                                    <Title
                                        content="korpa"
                                        style={styles.cartTitle}
                                    />
                                    <div className={styles.scrollItemsDiv}>
                                        {cartItems.map(({ meal }) => {
                                            return (
                                                <CartItem
                                                    key={meal.id}
                                                    meal={meal}
                                                />
                                            )
                                        })}
                                    </div>
                                    <div className={styles.priceDiv}>
                                        <Text
                                            content="Ukupno:"
                                            style={styles.priceLabel}
                                        />
                                        <div className={styles.totalPriceDiv}>
                                            <Text
                                                content={getTotalPrice().toString()}
                                                style={styles.totalPrice}
                                            />
                                            <Text
                                                content="RSD"
                                                style={styles.totalPrice}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={styles.confirmButtonWrapper}
                                    >
                                        <RegularButton
                                            content="Potvrdi rezervaciju"
                                            isActive
                                            style={styles.confirmButton}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {isMobile ? <MobileFooter /> : <Footer />}
            </div>
            <SuccessNotificationModal
                modalIsOpen={showNotification}
                closeModal={() => setShowNotification(false)}
                title="rezervacija uspešna"
                buttonText="rezerviši ponovo"
            />
            {isMobile && !showCart && (
                <div
                    className={styles.bottomCart}
                    onClick={() => setShowCart(true)}
                >
                    {isCartEmpty() ? (
                        <>
                            <div className={styles.emptyIconWrapper}>
                                <Image
                                    src={cartIcon}
                                    alt=""
                                    className={styles.cartIcon}
                                />
                            </div>
                            <label className={styles.cartInfo}>
                                Vaša korpa je prazna, rezervišite neko jelo iz
                                dnevnog menija.
                            </label>
                        </>
                    ) : (
                        <>
                            <div className={styles.amountWrapper}>
                                <div className={styles.iconWrapper}>
                                    <Image
                                        src={cartIcon}
                                        alt=""
                                        className={styles.cartIcon}
                                    />
                                </div>
                                <label className={styles.cartInfo}>
                                    5 rezervacija
                                </label>
                            </div>
                            <div className={styles.priceWrapper}>
                                <label className={styles.priceLabel}>
                                    Ukupno:
                                </label>
                                <label className={styles.totalPrice}>
                                    1120 RSD
                                </label>
                            </div>
                        </>
                    )}
                </div>
            )}
            {isMobile && showCart && !isCartEmpty && (
                <div
                    className={styles.openCartContainer}
                    onClick={() => setShowCart(false)}
                >
                    <div
                        className={styles.openCartBottom}
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        <Title content="korpa" style={styles.cartTitle} />
                        <div className={styles.scrollItemsDiv}></div>
                        <div className={styles.priceDiv}>
                            <Text content="Ukupno:" style={styles.priceLabel} />
                            <div className={styles.totalPriceDiv}>
                                <Text
                                    content={getTotalPrice().toString()}
                                    style={styles.totalPrice}
                                />
                                <Text content="RSD" style={styles.totalPrice} />
                            </div>
                        </div>
                        <RegularButton
                            content="Potvrdi rezervaciju"
                            style={styles.confirmButton}
                            isActive
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default MealReservation
