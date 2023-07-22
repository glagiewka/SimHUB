import styles from './styles.module.css';

type Props = {
    color: string
    on: boolean
}

const Led = ({ color, on }: Props) => {
    return (
        <div className={styles.led} style={{ background: on ? color : '#000' }}></div>
    )
}

export default Led
