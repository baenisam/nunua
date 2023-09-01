import { Tab, Tabs, TabPanel, TabList } from "react-tabs";

import OwlCarousel from "~/components/features/owl-carousel";
import ProductTwelve from "~/components/features/products/product-twelve";

import { catFilter } from "~/utils";
import { productSlider } from "~/utils/data";

function DealCollection(props) {
  const { products = [], loading, categories } = props;

  return (
    <Tabs defaultIndex={0} selectedTabClassName="show">
      <div className="container products deal">
        <div className="heading heading-flex heading-border mb-3">
          <div className="heading-left">
            <h2 className="title">Hot Deals Products</h2>
          </div>

          <div className="heading-right">
            <TabList className="nav nav-pills nav-border-anim justify-content-center">
              <Tab className="nav-item">
                <span className="nav-link">All</span>
              </Tab>

              {/* <Tab className="nav-item">
                                <span className="nav-link">Electronics</span>
                            </Tab>

                            <Tab className="nav-item">
                                <span className="nav-link">Furniture</span>
                            </Tab>

                            <Tab className="nav-item">
                                <span className="nav-link">Clothes</span>
                            </Tab>

                            <Tab className="nav-item">
                                <span className="nav-link">Accessories</span>
                            </Tab> */}
              {categories?.slice(0, 6).map((item) => (
                <Tab className="nav-item">
                  <span className="nav-link">{item.name}</span>
                </Tab>
              ))}
            </TabList>
          </div>
        </div>
        <div className="tab-content tab-content-carousel">
          <TabPanel>
            {loading ? (
              <OwlCarousel
                adClass="owl-simple carousel-equal-height carousel-with-shadow"
                options={productSlider}
              >
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <div className="skel-pro" key={index}></div>
                ))}
              </OwlCarousel>
            ) : (
              <OwlCarousel
                adClass="owl-simple carousel-equal-height carousel-with-shadow"
                options={productSlider}
              >
                {products.slice(0, 6).map((item, index) => (
                  <ProductTwelve product={item} key={index} />
                ))}
              </OwlCarousel>
            )}
          </TabPanel>
          {categories?.slice(0, 4).map((catego) => (
            <TabPanel>
              {loading ? (
                <OwlCarousel
                  adClass="owl-simple carousel-equal-height carousel-with-shadow"
                  options={productSlider}
                >
                  {[1, 2, 3, 4, 5, 6].map((item, index) => (
                    <div className="skel-pro" key={index}></div>
                  ))}
                </OwlCarousel>
              ) : (
                <OwlCarousel
                  adClass="owl-simple carousel-equal-height carousel-with-shadow"
                  options={productSlider}
                >
                  {products.slice(0, 6).filter((prod) => prod.id_cat_sous === catego.id).map((item, index) => (
                    <ProductTwelve product={item} key={index} />
                  ))}
                </OwlCarousel>
              )}
            </TabPanel>))}
        </div>
      </div>
    </Tabs>
  );
}

export default DealCollection;
