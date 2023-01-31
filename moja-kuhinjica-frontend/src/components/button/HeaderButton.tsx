import React from 'react'
import styles from './HeaderButton.module.scss'

interface IHeaderButtonProps {
    active: boolean
    onClick: () => void
    content: string
    headerType: string
}
export const HeaderButton = ({
    active,
    onClick,
    content,
    headerType,
}: IHeaderButtonProps) => {
    return (
        <button
            className={
                active
                    ? headerType === 'profile'
                        ? styles.navButtonProfileSelected
                        : styles.navButtonSelected
                    : styles.navButton
            }
            onClick={onClick}
        >
            {content}
        </button>
    )
}
