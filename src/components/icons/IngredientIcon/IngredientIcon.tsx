import * as React from 'react'
import { IconProps } from '../Icon';
import Icon from '../Icon'

const IngredientIcon: React.FC<IconProps> = ({ className, color, width, height }) => {
    let colorResult: string = ''
    if (color === 'primary') {
        colorResult = "#000"
    } else if (color === 'secondary') {
        colorResult = "#AFADB5"
    } else if (color = "accent") {
        colorResult = "#518581"
    }
    return <Icon viewBox="0 0 24 24" color={color} width={width ? width : 24} height={height ? height : 24} className={'icon_wrapper' + ` ${className}`} >
        <g clipPath="url(#clip0_512_2048)">
            <path d="M23.1605 17.189C23.0466 14.3792 21.8991 11.7539 19.8988 9.75367C18.5148 8.36964 16.8316 7.39356 14.995 6.88571C14.8783 5.33494 13.5801 4.10855 12 4.10855C10.4199 4.10855 9.12175 5.3349 9.00503 6.88571C7.16847 7.39356 5.48523 8.36964 4.10124 9.75367C2.10094 11.7539 0.953486 14.3792 0.839533 17.189C0.364126 17.2677 0 17.6805 0 18.1778V18.8881C0 19.4413 0.450142 19.8914 1.00336 19.8914H22.9966C23.5499 19.8914 24 19.4413 24 18.8881V18.1778C24 17.6805 23.6359 17.2677 23.1605 17.189ZM12 5.06476C12.9736 5.06476 13.79 5.74768 13.997 6.6594C13.3445 6.54226 12.6769 6.48184 12 6.48184C11.3231 6.48184 10.6555 6.54226 10.003 6.6594C10.21 5.74768 11.0265 5.06476 12 5.06476ZM12 7.43804C17.4721 7.43804 21.953 11.7632 22.2034 17.1744H1.79663C2.04704 11.7632 6.52792 7.43804 12 7.43804ZM23.0439 18.8881C23.0439 18.9141 23.0227 18.9353 22.9967 18.9353H1.00336C0.977346 18.9353 0.956158 18.9141 0.956158 18.8881V18.1778C0.956158 18.1518 0.977346 18.1306 1.00336 18.1306H22.9967C23.0227 18.1306 23.0439 18.1518 23.0439 18.1778V18.8881Z" fill="#B5460F" />
            <path d="M21.4198 15.8536C21.1562 14.4656 20.5736 13.1279 19.735 11.9851C19.5787 11.7722 19.2795 11.7263 19.0666 11.8825C18.8537 12.0387 18.8078 12.3379 18.964 12.5508C19.7297 13.5941 20.2399 14.7654 20.4804 16.0319C20.5239 16.2612 20.7245 16.4209 20.9495 16.4209C20.9791 16.4209 21.0091 16.4181 21.0392 16.4123C21.2988 16.3632 21.4691 16.1129 21.4198 15.8536Z" fill="#B5460F" />
            <path d="M18.7107 10.8038C18.6075 10.7026 18.5004 10.6023 18.3924 10.5057C18.1958 10.3297 17.8934 10.3463 17.7174 10.543C17.5412 10.7398 17.5579 11.042 17.7547 11.2181C17.852 11.3052 17.9485 11.3956 18.0413 11.4867C18.1344 11.5779 18.2552 11.6233 18.3759 11.6233C18.4999 11.6233 18.6238 11.5754 18.7174 11.4799C18.9023 11.2913 18.8993 10.9886 18.7107 10.8038Z" fill="#B5460F" />
        </g>
        <defs>
            <clipPath id="clip0_512_2048">
                <rect width="24" height="24" fill="white" />
            </clipPath>
        </defs>
    </Icon>
}

export default IngredientIcon;