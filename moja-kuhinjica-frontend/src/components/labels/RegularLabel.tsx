import React from 'react'
import { RegularLabelStyled } from './style'

interface IRegularLabelProps {
    size: string
    content: string
}

const RegularLabel = ({ size, content }: IRegularLabelProps) => {
    return <RegularLabelStyled size={size}>{content}</RegularLabelStyled>
}

export default RegularLabel
