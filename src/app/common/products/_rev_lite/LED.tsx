import classNames from "classnames";

import styles from './styles.module.css';

type Props = {
    color: string
    on: boolean
    flash: boolean
}

const Led = ({ color, on, flash }: Props) => {
    const classes = classNames({
        [styles.led ]: true,
        [styles.flash]: flash,
        [styles.on]: on
    })

    const style: { [index: string]: string } = {
        ['--color']: color
    }

    return (
        <div className={classes} style={style}></div>
    )
}

export default Led
