import * as React from 'react'
import { IconProps } from '../Icon';
import Icon from '../Icon'
// import src from '../../../images/Check.svg'

const CheckIcon: React.FC<IconProps> = ({ className, color, width, height }) => {
    let colorResult: string = ''
    if (color === 'primary') {
        colorResult = "#000"
    } else if (color === 'secondary') {
        colorResult = "#AFADB5"
    } else if (color = "accent") {
        colorResult = "#B5460F"
    }
    let classes = `icon_wrapper ${className}`
    return <Icon viewBox="0 0 24 24" color={color} width={width ? width : 24} height={height ? height : 24} className={classes} ><path d="M4 11.6129L9.87755 18L20 7" stroke={colorResult} strokeWidth="2" /></Icon>
}

export default CheckIcon;
