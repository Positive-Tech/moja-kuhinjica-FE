import styles from './AdminMenuButton.module.scss'
import stylesReservationButton from './AdminMenuReservationButton.module.scss'

interface IMenuButtonProps {
    active?: boolean
    onClick?: () => void
    content: string
    numberOfReservations: number
}

export const AdminMenuReservationButton = ({
    active,
    onClick,
    content,
    numberOfReservations
}: IMenuButtonProps): JSX.Element => {
    return (
        <button
            onClick={onClick}
            className={`${
                active ? styles.menuButtonSelected : styles.menuButton}`}
        >
            {content}
            <button className={stylesReservationButton.numberOfReservations}>
                {numberOfReservations}
            </button>
        </button>
    )
}
