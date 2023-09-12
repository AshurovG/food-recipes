import React from 'react';
import styles from './DirectionsList.module.scss'
import Text from 'components/Text';

type DirectionsInfo = {
    title: string,
    text: string
}

export type DirectionsListProps = {
    steps?: Array<DirectionsInfo> | undefined
};

const DirectionsList: React.FC<DirectionsListProps> = ({
    steps
}) => {

    return (
        <div className={styles.directions__list}>
            {steps?.map((step: DirectionsInfo) =>
                <div key={step.title} className={styles['directions__list-item']}>
                    <Text view='p-16' weight='bold' className={styles['directions__list-title']}>{step.title}</Text>
                    <Text view='p-14' className={styles['directions__list-text']}>{step.text}</Text>
                </div>
            )}
        </div>
    )
};

export default DirectionsList;