import React, { useState } from 'react'
import Modal from 'react-modal'
import { FieldValues, useForm } from 'react-hook-form'
import { bgModal } from 'src/constants/constants'
import styles from './PasswordForgettingModal.module.scss'
import emailIcon from 'public/static/assets/images/email.svg'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import { FormInput } from '@/components/input/FormInput'
import { Text } from '@/components/label/Text'
import UserService from '@/service/User.service'

interface IPasswordForgettingModalProps {
    modalIsOpen: boolean
    closeModal: () => void
    openNotificationModal: () => void
    setMessage: (param: string) => void
}
export const PasswordForgettingModal = ({
    modalIsOpen,
    closeModal,
    openNotificationModal,
    setMessage,
}: IPasswordForgettingModalProps): JSX.Element => {
    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const resetPassword = (data: FieldValues): void => {
        UserService.forgotPassword(data)
            .then((res) => {
                // notification
                setMessage(res.data)
                reset()
                closeModal()
                openNotificationModal()
            })
            .catch((err) => {
                console.log(err)
                setErrorMessage(err.response.data.message)
                setShowError(true)
                reset()
                console.log(err)
            })
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={bgModal}
            className={styles.modalContainerLogin}
            ariaHideApp={false}
        >
            <div className={styles.formContainer}>
                <form
                    className={styles.formDiv}
                    onSubmit={handleSubmit((data) => resetPassword(data))}
                >
                    <label className={styles.formTitle}>
                        Zaboravili ste šifru?
                    </label>
                    <Text
                        content="Ne brinite, mi ćemo Vam poslati instrukcije za resetovanje."
                        style={styles.infoLabel}
                    />
                    {showError && <ErrorLabel content={errorMessage} />}
                    <FormInput
                        register={register}
                        errors={errors}
                        name="email"
                        src={emailIcon}
                        placeholder="Email"
                        type="text"
                        validationSchema={{
                            required: 'email is required',
                        }}
                        style={styles.passwordInput}
                    />

                    <button type="submit" className={styles.formButton}>
                        Resetuj šifru
                    </button>
                </form>
            </div>
        </Modal>
    )
}
