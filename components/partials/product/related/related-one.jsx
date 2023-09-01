import React from 'react';
import ProductSix from '~/components/features/products/product-six';
import OwlCarousel from '~/components/features/owl-carousel';

import { mainSlider8 } from '~/utils/data';

function RelatedProductsOne ( props ) {
    const { products } = props;

    return (
        <>
            <h2 className="title text-center mb-4">You May Also Like</h2>

            {
                props.loading ?
                    <OwlCarousel adClass="owl-simple carousel-equal-height carousel-with-shadow cols-xl-5 cols-lg-4 cols-md-3 cols-2" isTheme={ false } options={ mainSlider8 }>
                        {
                            [ 1, 2, 3, 4 ].map( ( item, index ) =>
                                <div className="skel-pro" key={ index }></div>
                            )
                        }
                    </OwlCarousel>
                    :
                    <OwlCarousel adClass="owl-simple carousel-equal-height carousel-with-shadow cols-lg-4 cols-md-3 cols-xs-2 cols-1" isTheme={ false } options={ mainSlider8 }>
                        {
                            products.map( ( product, index ) =>
                                <ProductSix product={ product } key={ index } />
                            )
                        }
                    </OwlCarousel>
            }
        </>
    );
}

export default React.memo( RelatedProductsOne );