import * as React from 'react'
import styles from "./Characteristic.module.scss"
import Text from 'components/Text';

export type СharacteristicProps = {
    title: string;
    value: string | number | undefined
};

const Сharacteristic: React.FC<СharacteristicProps> = ({
    title,
    value
}) => {
    return (
        <div className={styles['characteristic']}><Text view='p-16'>{title}</Text> <Text color='accent' weight='bold' view='p-16'>{value}</Text></div>
    )
}

export default Сharacteristic;