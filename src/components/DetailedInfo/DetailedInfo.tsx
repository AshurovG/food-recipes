import React from 'react';
import styles from './DetailedInfo.module.scss'
import IngredientIcon from 'components/icons/IngredientIcon';
import EquipmentIcon from 'components/icons/EquipmentIcon';

export type DetailedInfoProps = {
    type: 'ingredients' | 'equipment';
    children: React.ReactNode;
};

const DetailedInfo: React.FC<DetailedInfoProps> = ({
    type,
    children,
}) => {

    return (
        <div className={styles.detailed}>
            {type === 'ingredients' ? <IngredientIcon className={styles.detailed__icon} /> : <EquipmentIcon className={styles.detailed__icon} />}
            <div className={styles.detailed__text}>{children}</div>
        </div>
    )
};

export default DetailedInfo;