'use client'

import {useGameProperties} from '@common/data/game';

import {useInfo} from './data/useInfo';
import {LEDs} from './data/types';
import LED from './LED';

import styles from './styles.module.css';


type Props = {

}

const Product = (props: Props) => {
    const gameProperties = useGameProperties()
    const productInfo = useInfo();

    // TODO read current configuration
    const leds = Object.keys(productInfo.configuration.default.rpmColors) as unknown as (keyof LEDs<any>)[]
    const currentRpm = (gameProperties.currentRpm / 7000) * 100;

    console.log(currentRpm)

    return (
        <div className={styles.body}>
            {
                leds.map(led => {
                    const color = productInfo.configuration.default.rpmColors[led];
                    const rpm = productInfo.configuration.default.rpmPattern[led];

                    return <LED key={led} color={color} on={currentRpm >= rpm} />
                })
            }
        </div>
    )
}

export default Product
