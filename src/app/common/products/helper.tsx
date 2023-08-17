import {Products} from "@common/products/types";
import {Product as _Rev_Product} from '@common/products/_rev';
import {Product as _Rev_Lite_Product} from '@common/products/_rev_lite';

export const getProductComponent = (name: Products) => {
    switch (name) {
        case Products._Rev_Lite:
            return <_Rev_Lite_Product />;
        case Products._Rev:
            return <_Rev_Product />;
    }
    return null;
}
