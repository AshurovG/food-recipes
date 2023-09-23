import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import Text from '../Text/Text';
import LogoIcon from 'components/icons/LogoIcon';
import styles from './Header.module.scss';
import FavoritesIcon from 'components/icons/FavoritesIcon';
import AccountIcon from 'components/icons/AccountIcon';
import BurgerIcon from 'components/icons/BurgerIcon';
import { useLocalStore } from 'utils/useLocalStore';
import RecipesStore from 'Store/RecipesStore'

const blockNames: Array<string> = ['Recipes', 'Ingradients', 'Products', 'Menu Items', 'Meal Planning']

const Header: React.FC = () => {
    const recipesStore = useLocalStore(() => new RecipesStore());

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
                    <FavoritesIcon className={cn(styles.favorite__icon, styles.icons__item)} />
                    <AccountIcon className={styles.icons__item} />
                    {recipesStore.isBurgerMenuOpen === false
                        ? <BurgerIcon className={styles.burger__icon} color='accent' onClick={recipesStore.setIsBurgerMenuOpen} />
                        : <div className={styles.cancel__icon} onClick={recipesStore.setIsBurgerMenuOpen}></div>}
                </div>


                {recipesStore.isBurgerMenuOpen && <div className={styles.burger__menu}>{blockNames.map(blockName => (
                    <Text key={blockName} className={styles['burger__menu-item']} tag='span' view='p-16'>{blockName}</Text>
                ))}</div>}
            </div>


        </div >
    )
};

export default observer(Header);