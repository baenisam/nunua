import { Tab, Tabs, TabPanel, TabList } from 'react-tabs';

import OwlCarousel from '~/components/features/owl-carousel';
import ProductTwelve from '~/components/features/products/product-twelve';

import { attrFilter } from '~/utils';
import { productSlider } from '~/utils/data';

function FurnitureCollection( props ) {
    const { products = [], loading } = props;

    return (
        <Tabs defaultIndex={ 0 } selectedTabClassName="show" >
            <div className="container products furniture">
                <div className="heading heading-flex heading-border mb-3">
                    <div className="heading-left">
                        <h2 className="title">Furniture</h2>
                    </div>

                    <div className="heading-right">
                        <TabList className="nav nav-pills nav-border-anim justify-content-center">
                            <Tab className="nav-item">
                                <span className="nav-link">Featured</span>
                            </Tab>

                            <Tab className="nav-item">
                                <span className="nav-link">New</span>
                            </Tab>

                            <Tab className="nav-item">
                                <span className="nav-link">Best Seller</span>
                            </Tab>
                        </TabList>
                    </div>
                </div>
                <div className="tab-content tab-content-carousel">
                    <TabPanel>
                        {
                            loading ?
                                <OwlCarousel adClass="owl-simple carousel-equal-height carousel-with-shadow" options={ productSlider }>
                                    {
                                        [ 1, 2, 3, 4, 5, 6 ].map( ( item, index ) =>
                                            <div className="skel-pro" key={ index }></div>
                                        )
                                    }
                                </OwlCarousel>
                                :
                                <OwlCarousel adClass="owl-simple carousel-equal-height carousel-with-shadow" options={ productSlider }>
                                    {
                                        attrFilter( products, 'featured' ).map( ( item, index ) =>
                                            <ProductTwelve
                                                product={ item }
                                                key={ index } />
                                        )
                                    }
                                </OwlCarousel>
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            loading ?
                                <OwlCarousel adClass="owl-simple carousel-equal-height carousel-with-shadow" options={ productSlider }>
                                    {
                                        [ 1, 2, 3, 4, 5, 6 ].map( ( item, index ) =>
                                            <div className="skel-pro" key={ index }></div>
                                        )
                                    }
                                </OwlCarousel>
                                :
                                <OwlCarousel adClass="owl-simple carousel-equal-height carousel-with-shadow" options={ productSlider }>
                                    {
                                        attrFilter( products, 'new' ).map( ( item, index ) =>
                                            <ProductTwelve
                                                product={ item }
                                                key={ index } />
                                        )
                                    }
                                </OwlCarousel>
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            loading ?
                                <OwlCarousel adClass="owl-simple carousel-equal-height carousel-with-shadow" options={ productSlider }>
                                    {
                                        [ 1, 2, 3, 4, 5, 6 ].map( ( item, index ) =>
                                            <div className="skel-pro" key={ index }></div>
                                        )
                                    }
                                </OwlCarousel>
                                :
                                <OwlCarousel adClass="owl-simple carousel-equal-height carousel-with-shadow" options={ productSlider }>
                                    {
                                        attrFilter( products, 'top' ).map( ( item, index ) =>
                                            <ProductTwelve
                                                product={ item }
                                                key={ index } />
                                        )
                                    }
                                </OwlCarousel>
                        }
                    </TabPanel>
                </div>
            </div>
        </Tabs>
    )
}

export default FurnitureCollection;
