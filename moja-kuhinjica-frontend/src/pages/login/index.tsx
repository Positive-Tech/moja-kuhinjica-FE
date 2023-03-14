import React, { useState } from 'react'
import Image from 'next/image'
import { useForm, FieldValues } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from 'src/utils/hooks'
import { useRouter } from 'next/router'
import { FormInput } from '@/components/input/FormInput'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import { Text } from '@/components/label/Text'
import { userLogin } from '@/reduxStore/reducers/userReducer'
import styles from './LoginPage.module.scss'
import back from 'public/static/assets/images/backArrow.svg'
import email from 'public/static/assets/images/email.svg'
import password from 'public/static/assets/images/password.svg'
import { Oval } from 'react-loader-spinner'
import { routes } from '@/constants/constants'

const LoginPage = (): JSX.Element => {
    const [errorMessage, setErrorMessage] = useState<string>()
    const isLoading = useAppSelector(({ auth: { inProgress } }) => inProgress)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const login = (inputData: FieldValues): void => {
        dispatch(
            userLogin({
                inputData,
                onSuccess: () => {
                    router.push(routes.HOME_PAGE)
                    reset()
                },
                onError: (message: string) => {
                    setErrorMessage(message)
                },
            })
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Image src={back} alt="" onClick={() => router.back()} />
                <form
                    className={styles.formDiv}
                    onSubmit={handleSubmit((data) => login(data))}
                >
                    <label className={styles.formTitle}>Ulogujte se</label>
                    {errorMessage && <ErrorLabel content={errorMessage} />}
                    <FormInput
                        register={register}
                        errors={errors}
                        name="email"
                        src={email}
                        placeholder="Email"
                        type="text"
                        validationSchema={{
                            required: 'Obavezno polje.',
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'Pogrešan format email adrese.',
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
                            required: 'Obavezno polje.',
                        }}
                        style={styles.input}
                    />
                    <Text
                        content="Zaboravili ste šifru?"
                        style={styles.forgotPasswordLabel}
                        handleClick={() =>
                            router.push(routes.FORGOTTEN_PASSWORD_PAGE)
                        }
                    />
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
                            <button className={styles.formButton}>
                                Potvrdi
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
