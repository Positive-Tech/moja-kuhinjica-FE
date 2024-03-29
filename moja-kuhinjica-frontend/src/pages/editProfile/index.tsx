import React from 'react'
import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Image from 'next/image'
import UserService from '@/service/User.service'
import { Footer } from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import { FormInput } from '@/components/input/FormInput'
import Menu from '../../components/mobileMenu'
import { MobileHeader } from '@/components/header/mobileHeader/MobileHeader'
import { MobileFooter } from '@/components/footer/mobileFooter/MobileFooter'
import { PasswordChangeModal } from '@/components/modal/passwordChange/PasswordChangeModal'
import { MOBILE_WIDTH, routes } from '@/constants/constants'
import email from 'public/static/assets/images/email.svg'
import profile from 'public/static/assets/images/profile.svg'
import mobile from 'public/static/assets/images/mobile.svg'
import profileIcon from 'public/static/assets/images/profileHeader.svg'
import passwordIcon from 'public/static/assets/images/password.svg'
import { Oval } from 'react-loader-spinner'
import { useAppSelector } from '@/utils/hooks'

interface User {
    id: number
    name: string
    surname: string
    phoneNumber: string
    email: string
}
const emptyUser = {
    id: 0,
    name: '',
    surname: '',
    phoneNumber: '',
    email: '',
}
const EditProfilePage = (): JSX.Element => {
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [editName, setEditName] = useState<boolean>(false)
    const [editSurname, setEditSurname] = useState<boolean>(false)
    const [editPhoneNumber, setEditPhoneNumber] = useState<boolean>(false)
    const [user, setUser] = useState<User>(emptyUser)
    const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false)
    const router = useRouter()
    const loggedUser = useAppSelector((state) => state.auth.user)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        if (!router.isReady) return
        fetchUser()
    }, [loggedUser])

    useEffect(() => {
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize)
        if (windowWidth < MOBILE_WIDTH) setIsMobile(true)
        else setIsMobile(false)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [windowWidth])

    const fetchUser = (): void => {
        UserService.getUserById(loggedUser?.id)
            .then((res) => {
                const user = res.data
                user.phoneNumber = user.phoneNumber.split('+381')[1]
                setUser(user)
                reset()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleWindowResize = (): void => {
        setWindowWidth(window.innerWidth)
    }

    const editUser = (data: FieldValues): void => {
        setIsLoading(true)
        delete data.email
        data.phoneNumber = `+381${data.phoneNumber}`
        if (loggedUser?.id) data.id = +loggedUser.id
        UserService.editUserProfile(data)
            .then((res) => {
                // alert('successfully edited')
                setIsLoading(false)
            })
            .catch((err) => {
                setIsLoading(false)
                console.log(err)
            })
    }
    return (
        <div className="editProfile">
            {showMenu && <Menu closeMenu={() => setShowMenu(false)} />}
            {isMobile ? (
                <MobileHeader
                    handleClick={() => setShowMenu(true)}
                    showProfileIcon={false}
                />
            ) : (
                <Header type="red" selectedButton={0} />
            )}
            <div className="editProfile__container">
                <label className="editProfile__container__titleLabel">
                    Izmena profila
                </label>
                <div className="editProfile__container__formContainer">
                    <div className="editProfile__container__formContainer__formWrapper">
                        <form
                            className="editProfile__container__formContainer__formWrapper__formDiv"
                            onSubmit={handleSubmit((data) => editUser(data))}
                        >
                            <div className="editProfile__container__formContainer__formWrapper__formDiv__changePasswordContainer">
                                <Image
                                    src={profileIcon}
                                    alt=""
                                    className="editProfile__container__formContainer__formWrapper__formDiv__changePasswordContainer__profileIcon"
                                />
                                <div className="editProfile__container__formContainer__formWrapper__formDiv__changePasswordContainer__changePasswordWrapper">
                                    <Image
                                        src={passwordIcon}
                                        alt=""
                                        className="editProfile__container__formContainer__formWrapper__formDiv__changePasswordContainer__changePasswordWrapper__passwordIcon"
                                    />
                                    <label
                                        className="editProfile__container__formContainer__formWrapper__formDiv__changePasswordContainer__changePasswordWrapper__changePasswordLabel"
                                        onClick={() =>
                                            isMobile
                                                ? router.push(
                                                      routes.CHANGE_PASSWORD_PAGE
                                                  )
                                                : setShowPasswordModal(true)
                                        }
                                    >
                                        Promeni šifru
                                    </label>
                                </div>
                            </div>
                            <div className="editProfile__container__formContainer__formWrapper__formDiv__inputWrapper">
                                <FormInput
                                    register={register}
                                    errors={errors}
                                    name="name"
                                    src={profile}
                                    placeholder="Ime"
                                    type="text"
                                    validationSchema={{
                                        required: 'Ime je obavezno.',
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/,
                                            message:
                                                'Ime može da sadrži samo slova.',
                                        },
                                    }}
                                    defaultValue={user?.name}
                                    isEditable={true}
                                    style={
                                        editName
                                            ? 'editProfile__container__formContainer__formWrapper__formDiv__inputWrapper__disabledInput editProfile__container__formContainer__formWrapper__formDiv__inputWrapper__disabledInput--editable'
                                            : 'editProfile__container__formContainer__formWrapper__formDiv__inputWrapper__disabledInput'
                                    }
                                    handleEditClick={() => setEditName(true)}
                                    handleOnBlur={() => setEditName(false)}
                                />
                                <FormInput
                                    register={register}
                                    errors={errors}
                                    name="surname"
                                    src={profile}
                                    placeholder="Prezime"
                                    type="text"
                                    validationSchema={{
                                        required: 'Prezime je obavezno.',
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/,
                                            message:
                                                'Prezime može da sadrži samo slova.',
                                        },
                                    }}
                                    isEditable={true}
                                    style={
                                        editSurname
                                            ? 'editProfile__container__formContainer__formWrapper__formDiv__inputWrapper__disabledInput editProfile__container__formContainer__formWrapper__formDiv__inputWrapper__disabledInput--editable'
                                            : 'editProfile__container__formContainer__formWrapper__formDiv__inputWrapper__disabledInput'
                                    }
                                    defaultValue={user?.surname}
                                    handleOnBlur={() => setEditSurname(false)}
                                    handleEditClick={() => setEditSurname(true)}
                                />

                                <FormInput
                                    register={register}
                                    errors={errors}
                                    name="phoneNumber"
                                    src={mobile}
                                    placeholder=""
                                    type="number"
                                    validationSchema={{
                                        required: 'Broj telefona je obavezan.',
                                        pattern: {
                                            value: /^[0-9]{6,}$/,
                                            message:
                                                'Broj telefona sadrži minimalno 6 brojeva.',
                                        },
                                    }}
                                    isPhoneNumber={true}
                                    isEditable={true}
                                    style={
                                        editPhoneNumber
                                            ? 'editProfile__container__formContainer__formWrapper__formDiv__inputWrapper__disabledInput editProfile__container__formContainer__formWrapper__formDiv__inputWrapper__disabledInput--editable'
                                            : 'editProfile__container__formContainer__formWrapper__formDiv__inputWrapper__disabledInput'
                                    }
                                    defaultValue={user?.phoneNumber}
                                    handleOnBlur={() =>
                                        setEditPhoneNumber(false)
                                    }
                                    handleEditClick={() =>
                                        setEditPhoneNumber(true)
                                    }
                                />
                                <FormInput
                                    register={register}
                                    errors={errors}
                                    name="email"
                                    src={email}
                                    placeholder="Email"
                                    type="text"
                                    validationSchema={{
                                        required: 'email is required',
                                        pattern: {
                                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                            message: 'invalid email value',
                                        },
                                    }}
                                    style="editProfile__container__formContainer__formWrapper__formDiv__inputWrapper__disabledInput editProfile__container__formContainer__formWrapper__formDiv__inputWrapper__disabledInput--email"
                                    defaultValue={user?.email}
                                />
                                <div className="editProfile__container__formContainer__formWrapper__formDiv__inputWrapper__buttonWrapper">
                                    {isLoading ? (
                                        <Oval
                                            height={40}
                                            width={40}
                                            color="#c10016"
                                            wrapperStyle={{}}
                                            wrapperClass="editProfile__container__formContainer__formWrapper__formDiv__inputWrapper__buttonWrapper__spinner"
                                            visible={true}
                                            ariaLabel="oval-loading"
                                            secondaryColor="#c10016"
                                            strokeWidth={4}
                                            strokeWidthSecondary={4}
                                        />
                                    ) : (
                                        <button
                                            type="submit"
                                            className="editProfile__container__formContainer__formWrapper__formDiv__inputWrapper__buttonWrapper__formButton"
                                        >
                                            Potvrdi
                                        </button>
                                    )}
                                </div>
                            </div>
                            {showPasswordModal && (
                                <PasswordChangeModal
                                    modalIsOpen={showPasswordModal}
                                    closeModal={() =>
                                        setShowPasswordModal(false)
                                    }
                                />
                            )}
                        </form>
                    </div>
                </div>
                {isMobile ? <MobileFooter /> : <Footer />}
            </div>
        </div>
    )
}

export default EditProfilePage
