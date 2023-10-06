import * as React from 'react'
import { IconProps } from '../Icon';
import Icon from '../Icon'

const AccountIcon: React.FC<IconProps> = ({ className, color, width, height, onClick }) => {
    let colorResult: string = ''
    if (color === 'primary') {
        colorResult = "#000"
    } else if (color === 'secondary') {
        colorResult = "#AFADB5"
    } else if (color = "accent") {
        colorResult = "#B5460F"
    }
    let classes = `icon_wrapper ${className}`
    return <Icon viewBox="0 0 24 24" onClick={onClick} color={color} width={width ? width : 24} height={height ? height : 24} className={classes} >
        <g clipPath="url(#clip0_505_651)">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 13C14.3955 13 16.5753 13.6937 18.1777 14.6715C18.9786 15.1602 19.6621 15.7363 20.156 16.3615C20.642 16.9767 21 17.713 21 18.5C21 19.3449 20.5889 20.0111 19.9973 20.4859C19.4368 20.9359 18.6982 21.2336 17.9128 21.4416C16.3353 21.8593 14.229 22 12 22C9.77101 22 7.66466 21.8593 6.08716 21.4416C5.30182 21.2336 4.56324 20.9359 4.00266 20.4859C3.41114 20.0111 3 19.3449 3 18.5C3 17.713 3.35805 16.9767 3.84397 16.3615C4.33788 15.7363 5.02143 15.1602 5.82227 14.6715C7.42467 13.6937 9.60453 13 12 13ZM12 15C9.97719 15 8.15705 15.5898 6.86402 16.3788C6.21714 16.7735 5.72913 17.2015 5.41339 17.6013C5.08967 18.0111 5 18.3206 5 18.5C5 18.6216 5.03657 18.7512 5.2547 18.9263C5.50376 19.1262 5.93676 19.3328 6.59914 19.5082C7.91706 19.8572 9.81071 20 12 20C14.1893 20 16.0829 19.8572 17.4009 19.5082C18.0632 19.3328 18.4962 19.1262 18.7453 18.9263C18.9634 18.7512 19 18.6216 19 18.5C19 18.3206 18.9103 18.0111 18.5866 17.6013C18.2709 17.2015 17.7829 16.7735 17.136 16.3788C15.8429 15.5898 14.0228 15 12 15ZM12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7C7 4.23858 9.23858 2 12 2ZM12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4Z" fill={colorResult} />
        </g>
        <defs>
            <clipPath id="clip0_505_651">
                <rect width="24" height="24" fill="white" />
            </clipPath>
        </defs>
    </Icon>
}

export default AccountIcon;