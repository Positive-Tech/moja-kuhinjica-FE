import React, { useState } from 'react'
import Image from 'next/image'
import increment from 'public/static/assets/images/increment.svg'
import decrement from 'public/static/assets/images/decrement.svg'
import styles from './AmountButton.module.scss'
import { useAppDispatch } from '@/utils/hooks'
import { changeMealAmount } from '@/reduxStore/reducers/restaurantReducer'
import { IMeal } from '@/service/Restaurant.service'

const FIRST_ELEMENT = 1
const INCREMENT_VALUE = 1
const DECREMENT_VALUE = -1
interface IAmountButtonProps {
    style?: string
    labelStyle?: string
    meal: IMeal
}
export const AmountButton = ({
    style,
    labelStyle,
    meal,
}: IAmountButtonProps): JSX.Element => {
    const [amount, setAmount] = useState<number>(FIRST_ELEMENT)
    const dispatch = useAppDispatch()

    const changeAmount = (amountValue: number): void => {
        dispatch(changeMealAmount({ meal, amount: amountValue }))
        setAmount(amount + amountValue)
    }

    return (
        <div className={`${styles.amountWrapper} ${style}`}>
            <Image
                src={decrement}
                alt=""
                className={styles.button}
                onClick={() => {
                    if (amount <= FIRST_ELEMENT) return
                    changeAmount(DECREMENT_VALUE)
                }}
            />
            <label className={`${styles.contentLabel} ${labelStyle}`}>
                {amount}
            </label>
            <Image
                src={increment}
                alt=""
                className={styles.button}
                onClick={() => {
                    changeAmount(INCREMENT_VALUE)
                }}
            />
        </div>
    )
}
