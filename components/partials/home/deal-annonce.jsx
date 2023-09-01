import { Tab, Tabs, TabPanel, TabList } from "react-tabs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ShopListFour from "../shop/list/shop-list-four";
import { scrollToPageContent } from "~/utils";
import Pagination from "~/components/features/pagination";

function DealAnnonce(props) {
  const router = useRouter();
  const query = router.query;
  const { products = [], loading, categories } = props;
  const totalCount = products?.length;
  const [perPage, setPerPage] = useState(12);

  useEffect(() => {
    //scrollToPageContent();
  }, [query, perPage]);

  return (
    <Tabs defaultIndex={0} selectedTabClassName="show">
      <div className="container products deal">
        <div className="heading heading-flex heading-border mb-3">
          <div className="heading-left">
            <h2 className="title">Annonces tendances</h2>
          </div>
        </div>
        <div className="tab-content tab-content-carousel">
          {/* {loading ? (
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
                  {products.map((item, index) => (
                    <ProductTwelve product={item} key={index} />
                  ))}
                </OwlCarousel>
              )} */}
          <ShopListFour
            products={products}
            perPage={perPage}
            loading={loading}
          ></ShopListFour>

          {totalCount > perPage ? (
            <Pagination perPage={perPage} total={totalCount}></Pagination>
          ) : (
            ""
          )}
        </div>
      </div>
    </Tabs>
  );
}

export default DealAnnonce;
