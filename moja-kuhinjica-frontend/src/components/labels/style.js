import styled from 'styled-components'

export const TitleLabelStyled = styled('label')`
    font-family: Poppins;
    font-weight: 600;
    color: #333333;
    font-size: ${(props) => props.size};
    padding-bottom: 2%;
`

export const RegularLabelStyled = styled('label')`
    font-family: Poppins;
    font-weight: 400;
    color: #8a8a8a;
    font-size: ${(props) => props.size};
`
export const LabelSeparator = styled('label')`
    color: #8a8a8a;
    margin-right: 10px;
    margin-left: 10px;
`