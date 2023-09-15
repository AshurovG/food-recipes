import React from 'react';
import cn from 'classnames';
import Text from '../Text/Text';
import LogoIcon from 'components/icons/LogoIcon';
import styles from './Header.module.scss';
import FavoritesIcon from 'components/icons/FavoritesIcon';
import AccountIcon from 'components/icons/AccountIcon';
import classNames from 'classnames';

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
                    <FavoritesIcon className={cn(styles.favorite__icon, styles.icons__item)} /> <AccountIcon className={styles.icons__item} />
                </div>
            </div>
        </div>
    )
};

export default Header;