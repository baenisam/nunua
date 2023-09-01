import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";

import withApollo from "~/server/apollo";
import { GET_PRODUCT } from "~/server/queries";
import useAsync from "~/Hooks/useAsync";
import ErrorPage from "~/pages/404";
import Breadcrumb from "~/components/partials/product/breadcrumb";
import GalleryDefault from "~/components/partials/product/gallery/gallery-default";
import DetailOne from "~/components/partials/product/details/detail-one";
import InfoOne from "~/components/partials/product/info-tabs/info-one";
import ProductServices from "~/services/ProductServices";
import RelatedProductsOne from "~/components/partials/product/related/related-one";

function DetailAdd() {
  const slug = useRouter().query.slug;


  const { data, loading } = useAsync(
    () => ProductServices.oneDetail(slug),
    slug
  );

  if(!slug || !data && !loading || !loading && data?.length === 0){
    return <ErrorPage/>
  }


  return (
    <div className="main">
      <Breadcrumb current={data?.name || data?.name_produit} />
      <div className="page-content">
        <div className="container skeleton-body">
          <div className="product-details-top">
            <div className={`row skel-pro-single ${loading ? "" : "loaded"}`}>
              <div className="col-md-6">
                <div className="skel-product-gallery"></div>
                {!loading ? (
                  <GalleryDefault
                    product={data ? data : null}
                    imageCollection={data?.images}
                  />
                ) : (
                  ""
                )}
              </div>

              <div className="col-md-6">
                <div className="entry-summary row">
                  <div className="col-md-12">
                    <div className="entry-summary1 mt-2 mt-md-0"></div>
                  </div>
                  <div className="col-md-12">
                    <div className="entry-summary2"></div>
                  </div>
                </div>
                {!loading ? <DetailOne product={data} /> : ""}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="skel-pro-tabs"></div>
          ) : (
            <InfoOne product={data} />
          )}
          {/* {data?.length > 0 && (
            <RelatedProductsOne products={relatedProduct} loading={loading} />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default withApollo({ ssr: typeof window == "undefined" })(
  DetailAdd
);
