// import React from 'react';
// import cn from 'classnames';
// import Text from '../Text/Text';
// import './Card.scss';

// export type CardProps = {
//     /** Дополнительный classname */
//     className?: string,
//     /** URL изображения */
//     image: string;
//     /** Слот над заголовком */
//     captionSlot?: React.ReactNode;
//     /** Заголовок карточки */
//     title: React.ReactNode;
//     /** Описание карточки */
//     subtitle: React.ReactNode;
//     /** Содержимое карточки (футер/боковая часть), может быть пустым */
//     contentSlot?: React.ReactNode;
//     /** Клик на карточку */
//     onClick?: React.MouseEventHandler;
//     /** Слот для действия */
//     actionSlot?: React.ReactNode;
// };


// const Card: React.FC<CardProps> = ({ className, image, captionSlot, title, subtitle, contentSlot, onClick, actionSlot }) => {
//     return (
//         <div className={cn('card', className)} onClick={onClick}>
//             <div className="card__header">
//                 <img className='card__header-src' src={image} alt="card" />
//             </div>
//             <div className="card__body">
//                 {captionSlot && (
//                     <Text
//                         className="card__caption"
//                         view='p-14'
//                         weight='medium'
//                         color='secondary'
//                     >
//                         {captionSlot}
//                     </Text>
//                 )}
//                 <Text
//                     maxLines={2}
//                     tag='h4'
//                     view='p-20'
//                     weight='medium'
//                     color='primary'
//                 >
//                     {title}
//                 </Text>
//                 <Text
//                     maxLines={3}
//                     className='card__subtitle'
//                     view='p-16'
//                     color='secondary'
//                 >
//                     {subtitle}
//                 </Text>
//                 <div className="card__footer">
//                     {contentSlot && (
//                         <Text
//                             view='p-18'
//                             weight='bold'
//                             className='card__content'
//                         >
//                             {contentSlot}
//                         </Text>
//                     )}
//                     <div className="card__action">{actionSlot}</div>
//                 </div>
//             </div>
//         </div>
//     )
// };

// export default Card;