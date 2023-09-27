import * as React from 'react'
import { IconProps } from '../Icon';
import Icon from '../Icon'

const BurgerIcon: React.FC<IconProps> = ({ className, color, width, height, onClick }) => {
    let colorResult: string = ''
    if (color === 'primary') {
        colorResult = "#000"
    } else if (color === 'secondary') {
        colorResult = "#AFADB5"
    } else if (color = "accent") {
        colorResult = "#B5460F"
    }
    let classes = `icon_wrapper ${className}`
    return <Icon viewBox="0 0 24 24" onClick={onClick} color={color} width={width ? width : 24} height={height ? height : 24} className={classes}>
        <path d="M4 18L20 18" stroke={colorResult} stroke-width="2" stroke-linecap="round" />
        <path d="M4 12L20 12" stroke={colorResult} stroke-width="2" stroke-linecap="round" />
        <path d="M4 6L20 6" stroke={colorResult} stroke-width="2" stroke-linecap="round" />
    </Icon>
}
export default BurgerIcon;