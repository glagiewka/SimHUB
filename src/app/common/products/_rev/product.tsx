'use client'

import {useCarProperties, useGameProperties} from '@common/data/game';

import {useProductProperties} from './data/useProductProperties';
import LED from './LED';
import styles from './styles.module.css';

const Product = () => {
    const gameProperties = useGameProperties()
    const { configuration } = useProductProperties();
    const carProperties = useCarProperties();
    const currentRpm = carProperties.maxRpm > 0 && gameProperties.currentRpm > 0 ? (gameProperties.currentRpm / carProperties.maxRpm) * 100 : 0;

    return (
        <div className={styles.body}>
            {
                configuration.ledNames.map(led => {
                    const color = configuration.rpmColors[led];
                    const rpm = configuration.rpmPattern[led];

                    return <LED key={led}
                                color={color}
                                on={currentRpm >= rpm}
                                flash={currentRpm >= configuration.flashRpm}
                    />
                })
            }
        </div>
    )
}

export default Product
