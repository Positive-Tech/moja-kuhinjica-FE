import React from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'
import { FieldValues } from 'react-hook-form'
import { FormInput } from '../../input/FormInput'
import { ErrorLabel } from '@/components/label/ErrorLabel'
import { bgModal } from '../../../constants/constants'
import styles from './LoginModal.module.scss'
import email from '../../../../public/static/assets/images/email.svg'
import password from '../../../../public/static/assets/images/password.svg'
import { Text } from '@/components/label/Text'
import { useAppDispatch, useAppSelector } from '@/utils/hooks'
import { userLogin } from '@/reduxStore/actions/userActions'

interface ILoginModalProps {
    modalIsOpen: boolean
    closeModal: () => void
    openPasswordForgettingModal: () => void
}
export interface RegistrationFormFields {
    email: string
    password: string
}
export const LoginModal = ({
    modalIsOpen,
    closeModal,
    openPasswordForgettingModal,
}: ILoginModalProps): JSX.Element => {
    const dispatch = useAppDispatch()
    const errorMessage = useAppSelector((state) => state.auth.authErrorMessage)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const login = (inputData: FieldValues): void => {
        dispatch<any>(userLogin(inputData))
        if (!!errorMessage) return
        closeModal()
        reset()
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
                            required: 'email is required',
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'invalid email value',
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
                            required: 'pass is required',
                        }}
                    />
                    <Text
                        content="Zaboravili ste šifru?"
                        style={styles.forgotPasswordLabel}
                        handleClick={() => {
                            closeModal()
                            openPasswordForgettingModal()
                        }}
                    />
                    <button type="submit" className={styles.formButton}>
                        Potvrdi
                    </button>
                </form>
            </div>
        </Modal>
    )
}
