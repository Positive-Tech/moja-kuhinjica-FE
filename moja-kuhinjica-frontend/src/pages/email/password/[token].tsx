import React, { useState } from 'react'
import styles from '../EmailPages.module.scss'
import passwordIcon from 'public/static/assets/images/password.svg'
import { Title } from '@/components/label/Title'
import { FormInput } from '@/components/input/FormInput'
import { FieldValues, useForm } from 'react-hook-form'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import { useRouter } from 'next/router'
import UserService from '@/service/User.service'
import { Oval } from 'react-loader-spinner'
import { routes } from '@/constants/constants'

const ResetPasswordPage = (): JSX.Element => {
    const [showError, setShowError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const router = useRouter()
    const { token } = router.query

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const validate = (data: FieldValues): void => {
        if (data.password === data.confirmPassword) {
            delete data.confirmPassword
            data.token = token
            resetPassword(data)
            reset()
        } else {
            setErrorMessage('Šifre se ne poklapaju. Pokušajte ponovo.')
            setShowError(true)
        }
    }

    const resetPassword = (data: FieldValues): void => {
        setIsLoading(true)
        setShowError(false)
        UserService.resetPassword(data)
            .then((res) => {
                router.push(routes.RESET_PASSWORD_PAGE)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setErrorMessage(err.response.data.message)
                setShowError(true)
                setIsLoading(false)
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.resetPassWrapper}>
                <Title
                    content="Resetovanje šifre"
                    style={styles.resetPassTitle}
                />
                <div className={styles.formWrapper}>
                    <form
                        onSubmit={handleSubmit((data) => validate(data))}
                        className={styles.formDiv}
                    >
                        {showError && <ErrorLabel content={errorMessage} />}
                        <FormInput
                            register={register}
                            errors={errors}
                            name="password"
                            src={passwordIcon}
                            placeholder="Unesi novu šifru"
                            type="password"
                            validationSchema={{
                                required: 'Šifra je obavezna.',
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message:
                                        'Šifra mora da sadrži minimum 8 karaktera i barem jedan broj.',
                                },
                            }}
                            style={styles.passwordInput}
                        />
                        <FormInput
                            register={register}
                            errors={errors}
                            name="confirmPassword"
                            src={passwordIcon}
                            placeholder="Potvrdi novu šifru"
                            type="password"
                            validationSchema={{
                                required: 'Šifra je obavezna.',
                            }}
                            style={styles.passwordInput}
                        />
                        <div className={styles.confirmButtonWrapper}>
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
                                    Resetuj šifru
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ResetPasswordPage
