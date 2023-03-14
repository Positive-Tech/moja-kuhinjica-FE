import React from 'react'
import styles from './RegularButton.module.scss'

interface IRegularButtonProps {
    onClick?: () => void
    content: string
    style?: string
    isActive: boolean | undefined
}
export const RegularButton = ({
    content,
    onClick,
    style,
    isActive,
}: IRegularButtonProps): JSX.Element => {
    return (
        <button
            onClick={onClick}
            className={
                isActive
                    ? `${styles.button} ${style}`
                    : `${styles.disabledButton} ${style}`
            }
            disabled={!isActive}
        >
            {isActive ? content : `Dodato u korpu`}
        </button>
    )
}
