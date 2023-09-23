import * as React from 'react'
import { IconProps } from '../Icon';
import Icon from '../Icon'

const SearchIcon: React.FC<IconProps> = ({ className, color, width, height }) => {
    return <Icon viewBox="0 0 24 24" color={color} width={width ? width : 24} height={height ? height : 24} className={className} >
        <g clipPath="url(#clip0_505_662)">
            <path d="M16 14H15.21L14.93 13.73C15.91 12.59 16.5 11.11 16.5 9.5C16.5 5.91 13.59 3 10 3C6.41 3 3.5 5.91 3.5 9.5C3.5 13.09 6.41 16 10 16C11.61 16 13.09 15.41 14.23 14.43L14.5 14.71V15.5L19.5 20.49L20.99 19L16 14ZM10 14C7.51 14 5.5 11.99 5.5 9.5C5.5 7.01 7.51 5 10 5C12.49 5 14.5 7.01 14.5 9.5C14.5 11.99 12.49 14 10 14Z" fill="white" />
        </g>
        <defs>
            <clipPath id="clip0_505_662">
                <rect width="24" height="24" fill="white" transform="translate(0.5)" />
            </clipPath>
        </defs>
    </Icon>
}

export default SearchIcon;