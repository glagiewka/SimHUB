import {useGameProperties} from "@common/data/game";
import {useInfo} from "./useInfo";

type Props = {

}

const Product = (props: Props) => {
    const gameProperties = useGameProperties()
    const productInfo = useInfo();

    return (
        <div>

        </div>
    )
}

export default Product
