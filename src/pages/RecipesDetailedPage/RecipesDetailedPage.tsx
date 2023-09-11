import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom'
import styles from './RecipesDetailedPage.module.scss';
import Header from 'components/Header';
import Сharacteristic from 'components/Сharacteristic'
import RecipeDescription from 'components/RecipeDescription';
import BackIcon from 'components/icons/BackIcon';
import DetailedInfo from 'components/DetailedInfo';
import DirectionsList from 'components/DirectionsList';
import Text from 'components/Text';
import Loader from 'components/Loader';

type RecipeData = {
    id: number;
    preparationMinutes: string;
    cookingMinutes: string;
    image: string;
    aggregateLikes: string;
    readyMinutes: string;
    servings: string;
    title: string;
    summary: any;
    extendedIngredients: [];
    equipment: [];
}

const RecipesDetailedPage: React.FC = () => {
    const [recipe, setRecipe] = useState<RecipeData>();
    const { id } = useParams();
    const [isDetailedPageLoading, setIsDetailedPageLoading] = useState(true)
    const apiKey = 'b628c4fc31ce4a519836f0bfa06853a4';

    React.useEffect(() => {
        const fetch = async () => {
            setIsDetailedPageLoading(true)
            const result = await axios({
                method: 'get',
                url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&addRecipeInformation=true&instructionsRequired=true&includeEquipment=true`
            })
            setRecipe({
                id: result.data.id,
                title: result.data.title,
                image: result.data.image,
                preparationMinutes: result.data.preparationMinutes,
                cookingMinutes: result.data.cookingMinutes,
                aggregateLikes: result.data.aggregateLikes,
                servings: result.data.servings,
                readyMinutes: result.data.readyInMinutes,
                summary: result.data.summary,
                extendedIngredients: result.data.extendedIngredients,
                equipment: result.data.analyzedInstructions[0].steps,
            });
            setIsDetailedPageLoading(false)
        }
        fetch()

    }, [])
    return (
        <div className={styles.detailed__page}>
            <Header />
            {isDetailedPageLoading
                ? <div className={styles.loader__wrapper}><Loader className={styles.loader} size='xl'></Loader></div>
                : <div className={styles.detailed__wrapper}>
                    <div className={styles['content__title-flex']}>
                        <Link to='/'><BackIcon className={styles.back__button} /></Link><h1 className={styles.content__title} >{recipe?.title}</h1>
                    </div>


                    <div className={styles.main__info}>
                        <img className={styles['main__info-image']} src={recipe?.image} alt={recipe?.title} />
                        <div className={styles['main__info-content']}>
                            <Сharacteristic title={'Preparation'} value={`${recipe?.preparationMinutes} minutes`} />
                            <Сharacteristic title={'Cooking'} value={`${recipe?.cookingMinutes} minutes`} />
                            <Сharacteristic title={'Total'} value={`${recipe?.readyMinutes} minutes`} />
                            <Сharacteristic title={'Rating'} value={`${recipe?.aggregateLikes} likes`} />
                            <Сharacteristic title={'Servings'} value={`${recipe?.servings} servings`} />

                        </div>
                    </div>

                    <RecipeDescription>
                        <div dangerouslySetInnerHTML={{ __html: recipe?.summary }}></div>
                    </RecipeDescription>

                    <div className={styles.features}>
                        <div className={styles.features__item}>
                            <Text className={styles['features__item-title']} view='p-20' weight='bold'>Ingredients</Text>
                            <div className={`${styles['features__ingredients-content']} ${styles['features__item-content']}`}>
                                {recipe?.extendedIngredients.map((item: any) =>
                                    <DetailedInfo key={item.original} type='ingredients'> {item.original}</DetailedInfo>
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
                                {recipe?.equipment.map((item: any, index) =>
                                    item.equipment.length > 0 &&
                                    <DetailedInfo key={index} type='equipment'> {item.equipment[0].name}</DetailedInfo>
                                )}
                            </div>
                        </div>
                    </div>
                    <Text className={styles['features__item-title']} view='p-20' weight='bold'>Directions</Text>
                    <DirectionsList steps={recipe?.equipment.map((item: any) => {
                        return {
                            title: `step ${item.number}`,
                            text: `${item.step}`
                        }
                    })} />
                </div>
            }

        </div>
    )
};

export default RecipesDetailedPage;