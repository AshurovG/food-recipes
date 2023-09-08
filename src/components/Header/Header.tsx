import React from 'react';
import cn from 'classnames';
import Text from '../Text/Text';
import LogoIcon from 'components/icons/LogoIcon';
import styles from './Header.module.scss';
import FavoritesIcon from 'components/icons/FavoritesIcon';
import AccountIcon from 'components/icons/AccountIcon';
import classNames from 'classnames';

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


const Header: React.FC = () => {
    const blockNames: Array<string> = ['Recipes', 'Ingradients', 'Products', 'Menu Items', 'Meal Planning']
    return (
        <div className={styles.header}>
            <div className={styles.header__wrapper}>
                <LogoIcon />
                <Text className={styles.header__title} view='p-20'>Food Client</Text>
                <Text className={styles.header__blocks} tag='span'>
                    {blockNames.map(blockName => (
                        <Text key={blockName} className={styles.header__block} tag='span' view='p-16'>{blockName}</Text>
                    ))}
                </Text>

                <div className={styles.icons}>
                    <FavoritesIcon className={styles.favorite__icon} /> <AccountIcon />
                </div>
            </div>
        </div>
    )
};

export default Header;