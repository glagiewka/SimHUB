import styles from './styles.module.css';
import { Product as Rev_Product } from '@common/products/_rev';


type Props = {
    name: string
}

const ProductTile = ({name}: Props) => {
    return (
        <div className={styles.tile}>
            {name}
            <Rev_Product />
        </div>
    )
}

export default ProductTile
