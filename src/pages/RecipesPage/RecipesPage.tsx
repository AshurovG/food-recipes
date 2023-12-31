import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './RecipesPage.module.scss';
import Header from 'components/Header';
import MainImage from 'components/MainImage';
import Input from 'components/Input';
import MultiDropdown from 'components/MultiDropdown';
import Text from 'components/Text';
import SearchIcon from 'components/icons/SearchIcon';
import Button from 'components/Button';
import Loader from 'components/Loader';
import RecipesList from 'components/RecipesList';
import { useLocalStore } from 'utils/useLocalStore';
import RecipesStore from 'Store/RecipesStore'
import { useQueryParamsStoreInit } from 'Store/RootStore/hooks/useQueryParamsStoreInit';

const RecipesPage: React.FC = () => {
    useQueryParamsStoreInit();
    const recipesStore = useLocalStore(() => new RecipesStore());

    React.useEffect(() => {
        recipesStore.getRecipesData();
    }, [recipesStore.offset, recipesStore.isOnSearchClick]);
    

    const navigate = useNavigate();
    const handleFormSubmit = () => {
        if (recipesStore.getDropdownTitle(recipesStore.dropdownValue) === 'Choose a category' && recipesStore.inputValue === '') {
            navigate('');
            console.log(111)
        } else if (recipesStore.getDropdownTitle(recipesStore.dropdownValue) === 'Choose a category' && recipesStore.inputValue) {
            console.log(222)
            navigate(`?search=${recipesStore.inputValue}`)
        } else if (recipesStore.getDropdownTitle(recipesStore.dropdownValue) !== 'Choose a category' && recipesStore.inputValue == ''){
            navigate(`?type=${recipesStore.getDropdownTitle(recipesStore.dropdownValue)}`)
            console.log(333)
        } else {
            navigate(`?search=${recipesStore.inputValue}&type=${recipesStore.getDropdownTitle(recipesStore.dropdownValue)}`);
            console.log(444)
        }
        recipesStore.setIsOnSearchClick();
    };

    return (
        <div className={styles.recipes__page}>
            <Header/>
            <MainImage />
            <div className={styles['recipes__page-wrapper']}>
                <Text className={styles.search__title} view='p-20'>
                    Find the perfect food and <span style={{ textDecorationLine: 'underline' }}>drink ideas</span> for every occasion, from <span style={{ textDecorationLine: 'underline' }}>weeknight dinners</span> to <span style={{ textDecorationLine: 'underline' }}>holiday feasts</span>.
                </Text>
                <div className={styles['search__info-block']}>
                    <div className={styles['search__input-block']}>
                        <Input value={recipesStore.inputValue} placeholder='Enter dish...' onChange={recipesStore.setInputValue}></Input> <Button onClick={handleFormSubmit}><SearchIcon /></Button>
                    </div>

                    <MultiDropdown
                        className={styles.selection__block}
                        options={recipesStore.options}
                        value={recipesStore.dropdownValue}
                        onChange={recipesStore.handleDropdownChange}
                        getTitle={recipesStore.getDropdownTitle}
                    />
                </div>

                {recipesStore.isFirstPage
                    ? <div><RecipesList cards={recipesStore.list} />
                        {<div className={styles.loader__wrapper}>
                            <Loader className={styles.loader} size='l' />
                        </div>}
                    </div>
                    : <InfiniteScroll
                        className={styles.infinite__scroll}
                        dataLength={recipesStore.list.length}
                        next={recipesStore._loadMore}
                        hasMore={recipesStore.hasMore}
                        loader={
                            <div className={styles.loader__wrapper}>
                                <Loader className={styles.loader} size='xl' />
                            </div>
                        }
                        endMessage={<Text view='p-20' weight='medium' className={styles['end__list-message']}>There are no more recipes.</Text>}
                    >
                        <RecipesList cards={recipesStore.list} />
                    </InfiniteScroll>}
            </div>
        </div>
    )
};

export default observer(RecipesPage);