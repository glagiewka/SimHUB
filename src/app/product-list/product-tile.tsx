import styles from "./styles.module.css";

type Props = {
    name: string
}

const ProductTile = ({name}: Props) => {
    return (
        <div className={styles.tile}>
            {name}
        </div>
    )
}

export default ProductTile
