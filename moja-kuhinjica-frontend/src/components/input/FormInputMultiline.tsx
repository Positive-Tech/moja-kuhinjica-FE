import React, { useRef, useEffect } from 'react'

import Image from 'next/image'
import styles from './FormInputMultiline.module.scss'
interface IFormMultilineInputProps {
    src: string
    placeholder: string
    defaultValue?: string
}

export const FormMultilineInput = ({
    src,
    placeholder,
    defaultValue
}: IFormMultilineInputProps): JSX.Element => {

    const ref = useRef<HTMLTextAreaElement>(null)


    useEffect(() => {
        if (ref.current!==null) {
            ref.current.style.height = `${ref.current.scrollHeight}px`

            ref.current.addEventListener("keyup", e => {
                if (ref.current!==null) {
                    ref.current.style.height = "auto"
                    if (e.target!=null) {
                        let scHeight = (e.target as HTMLInputElement).scrollHeight
                        console.log(e)
                        ref.current.style.height = `${scHeight}px`
                    }
                }
            })
        }
    })

    return (
        <div className={styles.wrapper}>
            <Image src={src} className={styles.icon} alt="" />
            <textarea
                ref={ref}
                placeholder={placeholder}
                defaultValue={defaultValue}
            ></textarea>
        </div>
    )
}
