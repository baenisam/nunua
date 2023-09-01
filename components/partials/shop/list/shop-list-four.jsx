import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Empty from "~/components/Empty";
import ProductFourteen from "~/components/features/products/product-fourteen";
import ProductThirteen from "~/components/features/products/product-thirteen";

function ShopListFour(props) {
  const { loading, products = [], perPage } = props;
  const router = useRouter();
  const [fakeArray, setFakeArray] = useState([]);
  const [gridClass, setGridClass] = useState("col-6");
  const type = router.query.type;

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < perPage; i++) {
      temp.push(i);
    }
    setFakeArray(temp);
  }, [perPage]);

  useEffect(() => {
    setGridClass("col-6 col-md-2 col-lg-2 col-xl-2");
  }, [type]);



  return (
    <div className="products mb-3">
      {products.length ===  0 && !loading ? (
       <Empty description="Il n'y a aucune donnée pour votre recherche" />
      ) : (
        <>
          <div className="row">
            {loading
              ? fakeArray.map((item, index) => (
                  <div className={gridClass} key={index}>
                    <div className="skel-pro"></div>
                  </div>
                ))
              : products.map((product, index) => (
                  <div className={gridClass} key={index}>
                    <ProductFourteen product={product} />
                  </div>
                ))}
          </div>

        </>
      )}
    </div>
  );
}

export default React.memo(ShopListFour);
