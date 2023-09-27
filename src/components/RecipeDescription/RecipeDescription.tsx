import React from 'react';
import styles from './RecipeDescription.module.scss';
import Text from 'components/Text';

export type RecipeDescriptionProps = {
    children: React.ReactNode;
};

const RecipeDescription: React.FC<RecipeDescriptionProps> = ({ children }) => {
    return (
        <Text view='p-16' className={styles.description__text}>
            {children}
        </Text>
    )
};

export default RecipeDescription;