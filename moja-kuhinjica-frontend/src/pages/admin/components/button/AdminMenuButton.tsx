import styles from './AdminMenuButton.module.scss'

interface IMenuButtonProps {
    active?: boolean
    onClick?: () => void
    content: string
}

export const AdminMenuButton = ({
    active,
    onClick,
    content,
}: IMenuButtonProps): JSX.Element => {
    return (
        <button
            onClick={onClick}
            className={`${
                active ? styles.menuButtonSelected : styles.menuButton}`}
        >
            {content}
        </button>
    )
}
