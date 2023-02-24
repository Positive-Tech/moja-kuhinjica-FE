import styles from './RestaurantImage.module.scss'
import Image from 'next/image'
import bin from '../../../../../public/static/assets/images/bin.svg'

interface IRestaurantImageProps {
    image?: any
    onRemoveImage: (index: number) => void
}

export const RestaurantImage= ({
    image,
    onRemoveImage 
}: IRestaurantImageProps): JSX.Element => {
    return (
        <div className={styles.imageWrapper}>
            <Image src={image.img} alt="" fill/>
            <div className={styles.binWrapper} onClick={() => onRemoveImage(image.id)}>
                <Image src={bin} alt="" className={styles.binButton} />
            </div>
        </div>
    )
}
