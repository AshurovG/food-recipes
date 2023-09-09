import * as React from 'react'
import { IconProps } from '../Icon';
import Icon from '../Icon'

const ClockIcon: React.FC<IconProps> = ({ className, color, width, height }) => {
    let colorResult: string = ''
    if (color === 'primary') {
        colorResult = "#000"
    } else if (color === 'secondary') {
        colorResult = "#AFADB5"
    } else if (color = "accent") {
        colorResult = "#518581"
    }
    let classes: string = `icon_wrapper ${className}`
    return <Icon viewBox="0 0 14 14" color={color} width={width ? width : 14} height={height ? height : 14} className={classes} >
        <path d="M11.1818 1L13 2.81818M10.8182 10.8182L12.2727 13M2.81818 1L1 2.81818M3.18182 10.8182L1.72727 13M6.81818 3.90909V7.18182H8.63636M12.2727 7C12.2727 9.91207 9.91207 12.2727 7 12.2727C4.08795 12.2727 1.72727 9.91207 1.72727 7C1.72727 4.08796 4.08795 1.72727 7 1.72727C9.91207 1.72727 12.2727 4.08796 12.2727 7Z" stroke="#B5460F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </Icon>
}

export default ClockIcon;
