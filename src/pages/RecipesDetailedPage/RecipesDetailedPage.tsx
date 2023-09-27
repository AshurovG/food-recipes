import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom'
import { useLocalStore } from 'utils/useLocalStore';
import { Meta } from 'utils/meta';
import RecipeDetailedStore from 'Store/RecipeDetailedStore';
import styles from './RecipesDetailedPage.module.scss';
import Header from 'components/Header';
import Сharacteristic from 'components/Сharacteristic'
import RecipeDescription from 'components/RecipeDescription';
import BackIcon from 'components/icons/BackIcon';
import DetailedInfo from 'components/DetailedInfo';
import DirectionsList from 'components/DirectionsList';
import Text from 'components/Text';
import Loader from 'components/Loader';

const RecipesDetailedPage: React.FC = () => {
    const params = useParams();
    const id = params.id === undefined ? '' : params.id;
    const recipeDetailedStore = useLocalStore(() => new RecipeDetailedStore({ id: id }));
    

    React.useEffect(() => {
        recipeDetailedStore.getRecipeData();
            return () => {
                recipeDetailedStore.reset();
            };
    }, [recipeDetailedStore])

    if (recipeDetailedStore.meta === Meta.loading) {
        return <div className={styles.loader__wrapper}><Loader className={styles.loader} size='xl'></Loader></div>;
    }

    if (!recipeDetailedStore.recipe) {
        return null
    }

    return (
        <div className={styles.detailed__page}>
            <Header />
            <div className={styles.detailed__wrapper}>
                <div className={styles['content__title-flex']}>
                    <Link to={recipeDetailedStore.previousUrl}><BackIcon className={styles.back__button} /></Link><h1 className={styles.content__title} >{recipeDetailedStore.recipe?.title}</h1>
                </div>

                <div className={styles.main__info}>
                    <img className={styles['main__info-image']} src={recipeDetailedStore.recipe?.image} alt={recipeDetailedStore.recipe?.title} />
                    <div className={styles['main__info-content']}>
                        <Сharacteristic title={'Preparation'} value={`${recipeDetailedStore.recipe?.preparationMinutes} minutes`} />
                        <Сharacteristic title={'Cooking'} value={`${recipeDetailedStore.recipe?.cookingMinutes} minutes`} />
                        <Сharacteristic title={'Total'} value={`${recipeDetailedStore.recipe?.readyMinutes} minutes`} />
                        <Сharacteristic title={'Rating'} value={`${recipeDetailedStore.recipe?.aggregateLikes} likes`} />
                        <Сharacteristic title={'Servings'} value={`${recipeDetailedStore.recipe?.servings} servings`} />

                    </div>
                </div>

                <RecipeDescription>
                    <div dangerouslySetInnerHTML={{ __html: recipeDetailedStore.recipe?.summary }}></div>
                </RecipeDescription>

                <div className={styles.features}>
                    <div className={styles.features__item}>
                        <Text className={styles['features__item-title']} view='p-20' weight='bold'>Ingredients</Text>
                        <div className={`${styles['features__ingredients-content']} ${styles['features__item-content']}`}>
                            {recipeDetailedStore.recipe?.extendedIngredients.map((value: {original: string}) =>
                                <DetailedInfo key={value.original} type='ingredients'> {value.original}</DetailedInfo>
                            )}
                        </div>
                    </div>
                    <div className={styles.separator}>
                        <div className={styles.separator__dot}></div>
                        <div className={styles.separator__line}> </div>
                    </div>

                    <div className={styles.features__item}>
                        <Text className={styles['features__item-title']} view='p-20' weight='bold'>Equipment</Text>
                        <div className={`${styles['features__equipment-content']} ${styles['features__item-content']}`}>
                            {recipeDetailedStore.recipe?.equipment.map((item: {equipment: { name: string }[]}, index) =>
                                item.equipment.length > 0 &&
                                <DetailedInfo key={index} type='equipment'> {item.equipment[0].name}</DetailedInfo>
                            )}
                        </div>
                    </div>
                </div>
                <Text className={styles['features__item-title']} view='p-20' weight='bold'>Directions</Text>
                <DirectionsList steps={recipeDetailedStore.recipe?.equipment.map((item: {number: number, step: string}) => {
                    return {
                        title: `step ${item.number}`,
                        text: `${item.step}`
                    }
                })} />
            </div>

        </div>
    )
};

export default observer(RecipesDetailedPage);