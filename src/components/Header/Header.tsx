import * as React from 'react';
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
    const isLogin = localStorage.getItem('isLogin') === 'true';
    console.log(isLogin)

    return (
        <div className={styles.header}>
            <div className={styles.header__wrapper}>
                <LogoIcon />
                <p className={styles.header__title}>Food Client</p>
                <Text className={styles.header__blocks} tag='span'>
                    <Link className={styles.header__block} to={'/'}>Recipes</Link>
                    <Link className={styles.header__block} to={`/mealplan`}>Meal planning</Link>
                    <Link className={styles.header__block} to={`/restaurants`}>About us</Link>
                </Text>

                <div className={styles.icons}>
                    <Link to={isLogin ? '/favorites' : '/auth'}><FavoritesIcon className={cn(styles.favorite__icon, styles.icons__item)} /></Link>
                    <Link className={styles.profile__link} to={isLogin ? '/profile' : '/auth'}><AccountIcon className={styles.icons__item} onClick={headerStore.setIsAuthFormOpen}/></Link>
                    {headerStore.isBurgerMenuOpen === false
                        ? <BurgerIcon className={styles.burger__icon} color='accent' onClick={headerStore.setIsBurgerMenuOpen} />
                        : <div className={styles.cancel__icon} onClick={headerStore.setIsBurgerMenuOpen}></div>}
                </div>

                {headerStore.isBurgerMenuOpen &&
                <div className={styles.burger__menu}>
                    <Link className={styles['burger__menu-item']} to={'/'}>Recipes</Link>
                    <Link className={styles['burger__menu-item']} to={`/mealplan`}>Meal planning</Link>
                    <Link className={styles['burger__menu-item']} to={`/restaurants`}>About us</Link>
                </div>}
            </div>


        </div >
    )
};

export default observer(Header);