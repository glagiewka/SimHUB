'use client'

import {useCarProperties, useGameProperties} from '@common/data/game';

import {useProductProperties} from './data/useProductProperties';
import {LEDs} from './data/types';
import LED from './LED';

import styles from './styles.module.css';


type Props = {

}

const Product = (props: Props) => {
    const gameProperties = useGameProperties()
    const productProperties = useProductProperties();
    const carProperties = useCarProperties()

    // TODO read current configuration
    const leds = Object.keys(productProperties.configuration.default.rpmColors) as unknown as (keyof LEDs<any>)[]
    const currentRpm = carProperties.maxRpm > 0 && gameProperties.currentRpm > 0 ? (gameProperties.currentRpm / carProperties.maxRpm) * 100 : 0;

    return (
        <div className={styles.body}>
            {
                leds.map(led => {
                    const color = productProperties.configuration.default.rpmColors[led];
                    const rpm = productProperties.configuration.default.rpmPattern[led];

                    return <LED key={led} color={color} on={currentRpm >= rpm} />
                })
            }
        </div>
    )
}

export default Product
