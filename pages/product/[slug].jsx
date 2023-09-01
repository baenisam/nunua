import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";

import withApollo from "~/server/apollo";
import { GET_PRODUCT } from "~/server/queries";
import useAsync from "~/Hooks/useAsync";
import Breadcrumb from "~/components/partials/product/breadcrumb";
import GalleryDefault from "~/components/partials/product/gallery/gallery-default";
import DetailOne from "~/components/partials/product/details/detail-one";
import InfoOne from "~/components/partials/product/info-tabs/info-one";
import ProductServices from "~/services/ProductServices";
import RelatedProductsOne from "~/components/partials/product/related/related-one";

function ProductDefault() {
  const slug = useRouter().query.slug;
  if (!slug) return <div></div>;

  const { data, loading } = useAsync(
    () => ProductServices.oneProduct(slug),
    slug
  );
  const product = data?.Detail_Product;
  const imageCollection = data?.ImageProduit;
  const relatedProduct = data?.Produit_Meme_cate;

  return (
    <div className="main">
      <Breadcrumb current={product?.name || product?.name_produit} />
      <div className="page-content">
        <div className="container skeleton-body">
          <div className="product-details-top">
            <div className={`row skel-pro-single ${loading ? "" : "loaded"}`}>
              <div className="col-md-6">
                <div className="skel-product-gallery"></div>
                {!loading ? (
                  <GalleryDefault
                    product={product ? product : null}
                    imageCollection={imageCollection}
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
                {!loading ? <DetailOne product={product} /> : ""}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="skel-pro-tabs"></div>
          ) : (
            <InfoOne product={product} />
          )}
          {relatedProduct?.length > 0 && (
            <RelatedProductsOne products={relatedProduct} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
}

export default withApollo({ ssr: typeof window == "undefined" })(
  ProductDefault
);
