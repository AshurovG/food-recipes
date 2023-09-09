import * as React from 'react'
import { IconProps } from '../Icon';
import Icon from '../Icon'

const BackIcon: React.FC<IconProps> = ({ className, color, width, height, onClick }) => {
    let colorResult: string = ''
    if (color === 'primary') {
        colorResult = "#000"
    } else if (color === 'secondary') {
        colorResult = "#AFADB5"
    } else if (color = "accent") {
        colorResult = "#518581"
    }
    let classes: string = `icon_wrapper arrow_down_icon ${className}`
    return <Icon viewBox="0 0 32 32" onClick={onClick} color={color} width={width ? width : 32} height={height ? height : 32} className={classes}>
        <path d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44" stroke="#B5460F" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    </Icon>
}
export default BackIcon;