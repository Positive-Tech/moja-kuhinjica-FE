import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useForm, FieldValues } from 'react-hook-form'
import UserService from '@/service/User.service'
import { FormInput } from '@/components/input/FormInput'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import styles from './RegistrationPage.module.scss'
import back from 'public/static/assets/images/backArrow.svg'
import profile from 'public/static/assets/images/profile.svg'
import email from 'public/static/assets/images/email.svg'
import password from 'public/static/assets/images/password.svg'
import mobile from 'public/static/assets/images/mobile.svg'
import successFilled from 'public/static/assets/images/successFilled.svg'
import success from 'public/static/assets/images/success.svg'
import { Oval } from 'react-loader-spinner'
import { routes } from '@/constants/constants'

const RegistrationPage = (): JSX.Element => {
    const [showError, setShowError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [userEmail, setUserEmail] = useState<string>('')
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const signIn = (inputData: FieldValues): void => {
        setIsLoading(true)
        UserService.signIn(inputData)
            .then((res) => {
                setUserEmail(inputData.email)
                setShowNotification(true)
                reset()
                setIsLoading(false)
            })
            .catch((err) => {
                setErrorMessage(err.message)
                setShowError(true)
                setIsLoading(false)
                console.log(err)
            })
    }

    const validate = (data: FieldValues): void => {
        if (data.password === data.confirmPassword) {
            delete data.confirmPassword
            data.phoneNumber = `+381${data.phoneNumber}`
            setShowError(false)
            signIn(data)
        } else {
            setErrorMessage('Šifre se ne poklapaju. Pokušajte ponovo.')
            setShowError(true)
        }
    }

    return (
        <div className={styles.container}>
            {!showNotification && (
                <div className={styles.wrapper}>
                    <Image src={back} alt="" onClick={() => router.back()} />
                    <form
                        className={styles.formDiv}
                        onSubmit={handleSubmit((data) => validate(data))}
                    >
                        <label className={styles.formTitle}>
                            Registrujte se
                        </label>
                        {showError && <ErrorLabel content={errorMessage} />}
                        <div className={styles.inputWrapper}>
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
                                style={styles.input}
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
                                style={styles.input}
                            />
                            <FormInput
                                register={register}
                                errors={errors}
                                name="email"
                                src={email}
                                placeholder="Email"
                                type="text"
                                validationSchema={{
                                    required: 'Email adresa je obavezna.',
                                    pattern: {
                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                        message:
                                            'Pogrešan format za email adresu.',
                                    },
                                }}
                                style={styles.input}
                            />
                            <FormInput
                                register={register}
                                errors={errors}
                                name="password"
                                src={password}
                                placeholder="Šifra"
                                type="password"
                                validationSchema={{
                                    required: 'Šifra je obavezna.',
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                        message:
                                            'Šifra mora da sadrži minimum 8 karaktera i barem jedan broj.',
                                    },
                                }}
                                style={styles.input}
                            />
                            <FormInput
                                register={register}
                                errors={errors}
                                name="confirmPassword"
                                src={password}
                                placeholder="Potvrdi šifru"
                                type="password"
                                validationSchema={{
                                    required: 'Ponovljena šifra je obavezna.',
                                }}
                                style={styles.input}
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
                                style={styles.input}
                                isPhoneNumber={true}
                            />
                        </div>
                        <div className={styles.buttonWrapper}>
                            {isLoading ? (
                                <Oval
                                    height={40}
                                    width={40}
                                    color="#c10016"
                                    wrapperStyle={{}}
                                    wrapperClass={styles.spinner}
                                    visible={true}
                                    ariaLabel="oval-loading"
                                    secondaryColor="#c10016"
                                    strokeWidth={4}
                                    strokeWidthSecondary={4}
                                />
                            ) : (
                                <button
                                    type="submit"
                                    className={styles.formButton}
                                >
                                    Potvrdi
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}
            {showNotification && (
                <div className={styles.notificationContainer}>
                    <div className={styles.notificationDiv}>
                        <Image src={successFilled} alt="" />

                        <div className={styles.contentDiv}>
                            <Image src={success} alt="" />
                            <label className={styles.contentLabel}>
                                Poslat je email na {userEmail}. Potrebno je
                                kliknuti na link u poruci kako bi aktivirali Vas
                                profil.
                            </label>
                        </div>
                        <button
                            className={styles.notificationButton}
                            onClick={() => router.push(routes.HOME_PAGE)}
                        >
                            zatvori
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RegistrationPage
