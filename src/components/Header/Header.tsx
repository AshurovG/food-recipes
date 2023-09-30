import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom'
import Text from '../Text/Text';
import LogoIcon from 'components/icons/LogoIcon';
import styles from './Header.module.scss';
import FavoritesIcon from 'components/icons/FavoritesIcon';
import AccountIcon from 'components/icons/AccountIcon';
import BurgerIcon from 'components/icons/BurgerIcon';
import { useLocalStore } from 'utils/useLocalStore';
import HeaderStore from 'Store/HeaderStore';

const Header: React.FC = () => {
    const headerStore = useLocalStore(() => new HeaderStore());

    return (
        <div className={styles.header}>
            <div className={styles.header__wrapper}>
                <LogoIcon />
                <Text className={styles.header__title} view='p-20'>Food Client</Text>
                <Text className={styles.header__blocks} tag='span'>
                    <Link className={styles.header__block} to={'/'}>Recipes</Link>
                    <Link className={styles.header__block} to={`/mealplan`}>Meal planning</Link>
                    <Link className={styles.header__block} to={`/restaurants`}>Restaurants</Link>
                    <Link className={styles.header__block} to={`/products`}>Products</Link>
                </Text>

                <div className={styles.icons}>
                    <FavoritesIcon className={cn(styles.favorite__icon, styles.icons__item)} />
                    <AccountIcon className={styles.icons__item} />
                    {headerStore.isBurgerMenuOpen === false
                        ? <BurgerIcon className={styles.burger__icon} color='accent' onClick={headerStore.setIsBurgerMenuOpen} />
                        : <div className={styles.cancel__icon} onClick={headerStore.setIsBurgerMenuOpen}></div>}
                </div>

                {headerStore.isBurgerMenuOpen &&
                <div className={styles.burger__menu}>
                    <Link className={styles['burger__menu-item']} to={'/'}>Recipes</Link>
                    <Link className={styles['burger__menu-item']} to={`/mealplan`}>Meal planning</Link>
                    <Link className={styles['burger__menu-item']} to={`/restaurants`}>Restaurants</Link>
                    <Link className={styles['burger__menu-item']} to={`/products`}>Products</Link>
                </div>}
            </div>


        </div >
    )
};

export default observer(Header);