import * as React from 'react';
import cn from 'classnames';
import Text from '../Text/Text';
import styles from './Card.module.scss';
import ClockIcon from 'components/icons/ClockIcon';

export type CardProps = {
    className?: string,
    image: string;
    captionSlot?: React.ReactNode;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    contentSlot?: React.ReactNode;
    onClick?: React.MouseEventHandler;
    actionSlot?: React.ReactNode;
};


const Card: React.FC<CardProps> = ({ className, image, captionSlot, title, subtitle, contentSlot, onClick, actionSlot }) => {
    return (
        <div className={cn(styles.card, className)} onClick={onClick}>
            <div className={styles.card__header}>
                <img className={styles['card__header-src']} src={image} alt="card" />
            </div>
            <div className={styles.card__body}>
                {captionSlot && (
                    <Text
                        className={styles.card__caption}
                        view='p-14'
                        weight='medium'
                        color='secondary'
                    >
                        <ClockIcon className={styles.card__icon} />
                        {captionSlot}
                    </Text>
                )}
                <Text
                    maxLines={2}
                    tag='h4'
                    view='p-20'
                    weight='medium'
                    color='primary'
                >
                    {title}
                </Text>
                <Text
                    maxLines={3}
                    className={styles.card__subtitle}
                    view='p-16'
                    color='secondary'
                >
                    {subtitle}
                </Text>
                <div className={styles.card__footer}>
                    {contentSlot && (
                        <Text
                            view='p-18'
                            weight='bold'
                            className={styles.card__content}
                        >
                            {contentSlot}
                        </Text>
                    )}
                    <div className={styles.card__action}>{actionSlot}</div>
                </div>
            </div>
        </div>
    )
};

export default Card;