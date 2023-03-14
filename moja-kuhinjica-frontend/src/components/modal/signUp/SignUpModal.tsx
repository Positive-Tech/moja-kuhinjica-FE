import React, { useState } from 'react'
import Modal from 'react-modal'
import { useForm, FieldValues } from 'react-hook-form'
import UserService from '@/service/User.service'
import { FormInput } from '@/components/input/FormInput'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import styles from './SignUpModal.module.scss'
import { bgModal } from '@/constants/constants'
import profile from 'public/static/assets/images/profile.svg'
import email from 'public/static/assets/images/email.svg'
import password from 'public/static/assets/images/password.svg'
import mobile from 'public/static/assets/images/mobile.svg'
import { Oval } from 'react-loader-spinner'

interface ISignUpModalProps {
    modalIsOpen: boolean
    closeModal: () => void
    openNotificationModal: (email: string) => void
}
export const SignUpModal = ({
    modalIsOpen,
    closeModal,
    openNotificationModal,
}: ISignUpModalProps): JSX.Element => {
    const [showError, setShowError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
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
                closeModal()
                reset()
                openNotificationModal(inputData.email)
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
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={bgModal}
            className={styles.modalContainer}
            ariaHideApp={false}
        >
            <div className={styles.formContainer}>
                <form
                    className={styles.formDiv}
                    onSubmit={handleSubmit((data) => validate(data))}
                >
                    <label className={styles.formTitle}>Registrujte se</label>
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
                                    message: 'Ime može da sadrži samo slova.',
                                },
                            }}
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
                                    message: 'Pogrešan format za email adresu.',
                                },
                            }}
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
                            <button type="submit" className={styles.formButton}>
                                Potvrdi
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </Modal>
    )
}
