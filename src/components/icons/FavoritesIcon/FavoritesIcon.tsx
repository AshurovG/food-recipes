import * as React from 'react'
import { IconProps } from '../Icon';
import styles from './FavoritesIcon.module.scss'
import Icon from '../Icon'

const FavoritesIcon: React.FC<IconProps> = ({ className, color, width, height }) => {
    let colorResult: string = ''
    if (color === 'primary') {
        colorResult = "#000"
    } else if (color === 'secondary') {
        colorResult = "#AFADB5"
    } else if (color = "accent") {
        colorResult = "#518581"
    }
    return <Icon viewBox="0 0 19 19" color={color} width={width ? width : 24} height={height ? height : 24} className={styles.icon_wrapper + ` ${className}`} ><path d="M9.50001 3.09586C7.80057 0.863387 4.96079 0.173456 2.8315 2.21773C0.702197 4.26201 0.402421 7.67991 2.07457 10.0977C3.46485 12.1079 7.67232 16.3476 9.0513 17.7199C9.20553 17.8734 9.28269 17.9501 9.3727 17.9803C9.45118 18.0066 9.53712 18.0066 9.6157 17.9803C9.70571 17.9501 9.78277 17.8734 9.9371 17.7199C11.3161 16.3476 15.5235 12.1079 16.9138 10.0977C18.5859 7.67991 18.3227 4.2405 16.1568 2.21773C13.9909 0.194961 11.1994 0.863387 9.50001 3.09586Z" stroke="#B5460F" stroke-linejoin="round" /></Icon>
}

export default FavoritesIcon;