import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form'
import styles from './FormInputMultiline.module.scss'
import errorIcon from '../../../public/static/assets/images/error.svg'
interface IFormMultilineInputProps {
    src: string
    placeholder: string
    type: string
    register: UseFormRegister<FieldValues>
    validationSchema: {}
    name: string
    errors: FieldErrors<FieldValues>
    style?: string
    defaultValue?: string
}

export const FormMultilineInput = ({
    src,
    placeholder,
    register,
    validationSchema,
    name,
    errors,
    style,
    defaultValue
}: IFormMultilineInputProps): JSX.Element => {
    const [invalidInput, setInvalidInput] = useState(false)

    const isValid = (): void => {
        if (errors[name]?.message) {
            console.log(errors)
            setInvalidInput(true)
            return
        }
        setInvalidInput(false)
    }
    useEffect(() => {
        isValid()
    })

    return (
        <div className={styles.wrapper}>
            <Image src={src} className={styles.icon} alt="" />
            <textarea
                className={
                    invalidInput
                        ? `${styles.invalidInput} ${style}`
                        : `${styles.input} ${style}`
                } 
                placeholder={placeholder}
                {...register(name, validationSchema)}
                defaultValue={defaultValue}
            ></textarea>
            {invalidInput && (
                <Image src={errorIcon} alt="" className={styles.sideIcon} />
            )}
        </div>
    )
}
