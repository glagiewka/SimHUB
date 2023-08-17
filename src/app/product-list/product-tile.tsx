import styles from './styles.module.css';
import {getProductComponent, Products} from "@common/products";

type Props = {
    id: Products
    name: string
}

const ProductTile = ({ id, name }: Props) => {
    return (
        <div className={styles.tile}>
            {name}
            <div className={styles.productContainer}>
                { getProductComponent(id) }
            </div>
        </div>
    )
}

export default ProductTile
