import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import styles from './RecipesDetailedPage.module.scss';
import Header from 'components/Header';
import Сharacteristic from 'components/Сharacteristic'
import RecipeDescription from 'components/RecipeDescription';
import BackIcon from 'components/icons/BackIcon';
import DetailedInfo from 'components/DetailedInfo';
import DirectionsList from 'components/DirectionsList';
import Text from 'components/Text';

type RecipeData = {
    id: number;
    preparationMinutes: string;
    cookingMinutes: string;
    image: string;
    aggregateLikes: string;
    servings: string;

    title: string;

    summary: string;

    extendedIngredients: [];

    equipment: [];
}

const RecipesDetailedPage: React.FC = () => {
    // const [value, setValue] = useState<Option[]>([]);  
    const [recipe, setRecipe] = useState<RecipeData>();
    const { id } = useParams();
    const apiKey = '3a40e1bfe3084f53b0d475f56d06468b';

    // React.useEffect(() => {
    //     const fetch = async () => {
    //         const result = await axios({
    //             method: 'get',
    //             url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&addRecipeInformation=true&instructionsRequired=true&includeEquipment=true`
    //         })
    //         setRecipe({
    //             id: result.data.id,
    //             title: result.data.title,
    //             image: result.data.image,
    //             preparationMinutes: result.data.preparationMinutes,
    //             cookingMinutes: result.data.cookingMinutes,
    //             aggregateLikes: result.data.aggregateLikes,
    //             servings: result.data.servings,
    //             summary: result.data.summary,
    //             extendedIngredients: result.data.extendedIngredients,
    //             equipment: result.data.analyzedInstructions[0].steps,
    //         });

    //         //   console.log(result.data.analyzedInstructions[0].steps[1].equipment[0].name)

    //     }

    //     fetch()
    //     console.log(recipe)
    // }, [])

    const info = [
        { title: 'title 1', value: 'value 1' },
        { title: 'title 1', value: 'value 1' },
        { title: 'title 1', value: 'value 1' },
        { title: 'title 1', value: 'value 1' },
        { title: 'title 1', value: 'value 1' }
    ]
    const steps = [
        { title: 'title 1', text: 'value 1' },
        { title: 'title 1', text: 'value 1' },
        { title: 'title 1', text: 'value 1' },
        { title: 'title 1', text: 'value 1' },
        { title: 'title 1', text: 'value 1' }
    ]
    return (
        <div className={styles.detailed__page}>
            <Header />

            <div className={styles.detailed__wrapper}>
                <div className={styles['content__title-flex']}>
                    <BackIcon /><h1 className={styles.content__title} >{recipe?.title}</h1>
                </div>

                <div className={styles.main__info}>
                    <img className={styles['main__info-image']} src={recipe?.image} alt={recipe?.title} />
                    <div className={styles['main__info-content']}>
                        {/* {info.map((item: any) =>
                            <Сharacteristic title={item.title} value={item.value} />
                        )} */}
                        <Сharacteristic title={'preparation'} value={recipe?.preparationMinutes} />
                        <Сharacteristic title={'cooking'} value={recipe?.cookingMinutes} />
                        <Сharacteristic title={'rating'} value={recipe?.aggregateLikes} />
                        <Сharacteristic title={'servings'} value={recipe?.servings} />

                    </div>
                </div>

                <RecipeDescription>
                    {recipe?.summary}
                </RecipeDescription>

                <div className={styles.features}>
                    <div className={styles.features__item}>
                        <h2 className={styles['features__item-title']}>Ingredients</h2>
                        <div className={`${styles['features__ingredients-content']} ${styles['features__item-content']}`}>
                            <DetailedInfo type='ingredients'> L ipsum dol</DetailedInfo>
                            <DetailedInfo type='ingredients'> Lorem, ipfsum dol</DetailedInfo>
                            <DetailedInfo type='ingredients'> Lorem, ipfffffffsum dol</DetailedInfo>
                            <DetailedInfo type='ingredients'> Lorem, ipsum dol</DetailedInfo>
                            <DetailedInfo type='ingredients'> Lorem, fdsfpsum dol</DetailedInfo>
                            <DetailedInfo type='ingredients'> Lorem, ipsum dol</DetailedInfo>
                            <DetailedInfo type='ingredients'> Lorem, ipsum dol</DetailedInfo>
                            <DetailedInfo type='ingredients'> Lorem, ipfssum dol</DetailedInfo>
                            <DetailedInfo type='ingredients'> Lorem, ifsdfdpsum dol</DetailedInfo>
                            <DetailedInfo type='ingredients'> Lorem, ipsum dol</DetailedInfo>
                            <DetailedInfo type='ingredients'> Lorem, ipsum dol</DetailedInfo>
                        </div>
                    </div>
                    <div className={styles.separator}>
                        <div className={styles.separator__dot}></div>
                        <div className={styles.separator__line}> </div>
                    </div>

                    <div className={styles.features__item}>
                        <h2 className={styles['features__item-title']}>Equipment</h2>
                        <div className={`${styles['features__equipment-content']} ${styles['features__item-content']}`}>
                            <DetailedInfo type='equipment'> Lorem, ipsum dol</DetailedInfo>
                            <DetailedInfo type='equipment'> Lorem, ipsum do.</DetailedInfo>
                            <DetailedInfo type='equipment'> Lorem, ifdpsum dol</DetailedInfo>
                            <DetailedInfo type='equipment'> Lorem, ipsum dol</DetailedInfo>
                            <DetailedInfo type='equipment'> Lorem, ipsum dol</DetailedInfo>
                            <DetailedInfo type='equipment'> Lorem, ipsum dol</DetailedInfo>
                        </div>
                    </div>
                </div>

                <DirectionsList steps={steps} />
            </div>
        </div>
    )
};

export default RecipesDetailedPage;