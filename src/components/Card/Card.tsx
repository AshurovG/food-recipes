import React, { useState } from 'react';
import Text from '../Text/Text';
import './Card.css'

export type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    image: string;
    /** Слот над заголовком */
    captionSlot?: React.ReactNode;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Описание карточки */
    subtitle: React.ReactNode;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    contentSlot?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    /** Слот для действия */
    actionSlot?: React.ReactNode;
};


const Card: React.FC<CardProps> = ({ className, image, captionSlot, title, subtitle, contentSlot, onClick, actionSlot }) => {
    let classes: string = 'card'
    if (className) {
        classes += ` ${className}`
    }
    let isCaptionSlotVisible = false
    if (captionSlot !== undefined) {
        isCaptionSlotVisible = true
    }
    return (
        <div className={classes} onClick={onClick}>
            <img className='card_image' src={image} alt="card image" />
            <div className="card_container">
                {isCaptionSlotVisible && <div className='card_caption'>{captionSlot && captionSlot}</div>}
                <Text className='card_title' tag='h3' view='title' maxLines={2}>{title}</Text>
                <Text className='card_subtitle' tag='p' view='title' maxLines={3}>{subtitle}</Text>
                <div className='footer_container'>
                    <div className='card_content'>{contentSlot && contentSlot}</div>
                    <div className='card_action'>{actionSlot && actionSlot}</div>
                </div>
            </div>

        </div>
    )
};

export default Card;