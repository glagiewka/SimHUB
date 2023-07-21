import { useProductList } from '@common/data/product'
import styles from "./styles.module.css";
import ProductTile from "./product-tile";

type Props = {

}

const ProductList = (props: Props) => {
    const products = useProductList()

    return (
        <div className={styles.productList}>
            { products.map(product => <ProductTile key={product.name} name={product.name}/>) }
        </div>
    )
}
export default ProductList
