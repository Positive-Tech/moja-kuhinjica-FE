import React, { useState } from 'react'
import Image from 'next/image'
import { useForm, FieldValues } from 'react-hook-form'
import { useRouter } from 'next/router'
import { FormInput } from '@/components/input/FormInput'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import { Text } from '@/components/label/Text'
import back from 'public/static/assets/images/backArrow.svg'
import emailIcon from 'public/static/assets/images/email.svg'
import UserService from '@/service/User.service'
import { Oval } from 'react-loader-spinner'

const PasswordForgettingPage = (): JSX.Element => {
    const [errorMessage, setErrorMessage] = useState<string>()
    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>()
    const [inputData, setInputData] = useState<FieldValues>()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const resetPassword = (data: FieldValues | undefined): void => {
        setIsLoading(true)
        UserService.forgotPassword(data)
            .then((res) => {
                setMessage(res.data)
                setInputData(data)
                setShowNotification(true)
                reset()
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setShowNotification(false)
                setErrorMessage(err.response.data.message)
                reset()
                console.log(err)
                setIsLoading(false)
            })
    }

    return (
        <div className="forgetContainer">
            <div className="forgetContainer__wrapper">
                <Image src={back} alt="" onClick={() => router.back()} />
                <form
                    className="forgetContainer__wrapper__formDiv"
                    onSubmit={handleSubmit((data) => resetPassword(data))}
                >
                    <label className="forgetContainer__wrapper__formDiv__formTitle">
                        {showNotification
                            ? 'Proverite svoj email'
                            : 'Zaboravili ste šifru?'}
                    </label>
                    <Text
                        content={
                            showNotification
                                ? message
                                : 'Ne brinite, mi ćemo Vam poslati instrukcije za resetovanje.'
                        }
                        style="forgetContainer__wrapper__formDiv__infoLabel"
                    />
                    {!showNotification && errorMessage && (
                        <ErrorLabel content={errorMessage} />
                    )}
                    {!showNotification && (
                        <FormInput
                            register={register}
                            errors={errors}
                            name="email"
                            src={emailIcon}
                            placeholder="Email"
                            type="text"
                            validationSchema={{
                                required: 'Obavezno polje.',
                                pattern: {
                                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    message: 'Pogrešan format email adrese.',
                                },
                            }}
                            style="forgetContainer__wrapper__formDiv__input"
                        />
                    )}
                    {!showNotification && (
                        <div className="forgetContainer__wrapper__formDiv__buttonWrapper">
                            {isLoading ? (
                                <Oval
                                    height={40}
                                    width={40}
                                    color="#c10016"
                                    wrapperStyle={{}}
                                    wrapperClass="forgetContainer__wrapper__formDiv__buttonWrapper__spinner"
                                    visible={true}
                                    ariaLabel="oval-loading"
                                    secondaryColor="#c10016"
                                    strokeWidth={4}
                                    strokeWidthSecondary={4}
                                />
                            ) : (
                                <button
                                    type="submit"
                                    className="forgetContainer__wrapper__formDiv__buttonWrapper__formButton"
                                >
                                    Resetuj šifru
                                </button>
                            )}
                        </div>
                    )}
                    {showNotification && (
                        <div className="forgetContainer__wrapper__formDiv__labelWrapper">
                            {!isLoading ? (
                                <>
                                    <Text
                                        content="Nije Vam stigao email?"
                                        style="forgetContainer__wrapper__formDiv__labelWrapper__infoLabel"
                                    />
                                    <Text
                                        content="Pošalji ponovo"
                                        style="forgetContainer__wrapper__formDiv__labelWrapper__infoLabel forgetContainer__wrapper__formDiv__labelWrapper__infoLabel--buttonLabel"
                                        handleClick={() =>
                                            resetPassword(inputData)
                                        }
                                    />
                                </>
                            ) : (
                                <Oval
                                    height={40}
                                    width={40}
                                    color="#c10016"
                                    wrapperStyle={{}}
                                    wrapperClass="forgetContainer__wrapper__formDiv__labelWrapper__spinner"
                                    visible={true}
                                    ariaLabel="oval-loading"
                                    secondaryColor="#c10016"
                                    strokeWidth={4}
                                    strokeWidthSecondary={4}
                                />
                            )}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default PasswordForgettingPage
