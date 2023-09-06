import * as React from 'react'

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
    width?: number,
    height?: number,
    children?: React.ReactNode,
    onClick?: () => void
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({ className, width, height, children, onClick }) => {
    return (
        <svg data-testid="icon" onClick={onClick} className={className} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
            {children}
        </svg>
    )
}

export default Icon;