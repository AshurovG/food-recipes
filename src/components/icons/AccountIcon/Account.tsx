import * as React from 'react'
import { IconProps } from '../Icon';
import Icon from '../Icon'

const AccountIcon: React.FC<IconProps> = ({ className, color, width, height }) => {
    let colorResult: string = ''
    if (color === 'primary') {
        colorResult = "#000"
    } else if (color === 'secondary') {
        colorResult = "#AFADB5"
    } else if (color = "accent") {
        colorResult = "#518581"
    }
    let classes: string = `icon_wrapper ${className}`
    return <Icon color={color} width={width ? width : 24} height={height ? height : 24} className={classes} ><path d="M4 11.6129L9.87755 18L20 7" stroke={colorResult} stroke-width="2" /></Icon>
}

export default AccountIcon;