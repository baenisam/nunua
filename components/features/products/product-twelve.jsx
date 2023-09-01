import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ALink from "~/components/features/alink";
import { rendererOne } from "~/components/features/count-down";

import { actions as wishlistAction } from "~/store/wishlist";
import { actions as cartAction } from "~/store/cart";
import { actions as compareAction } from "~/store/compare";
import { actions as demoAction } from "~/store/demo";

import { isInWishlist, isInCompare } from "~/utils";

function ProductTwelve(props) {
  const router = useRouter();
  const { product } = props;
  return (
    <div className="product text-center">
      <figure className="product-media">
        {/* {
                    product?.new ?
                        <span className="product-label label-new">New</span>
                        : ""
                } */}

        {/* {
                    product?.price ?
                        <span className="product-label label-sale">Sale</span>
                        : ""
                } */}
        {product?.new ? (
          <span className="product-label label-new">New</span>
        ) : (
          ""
        )}

        <ALink href={`/product/${product.id}`}>
          <LazyLoadImage
            alt="product"
            src={
              process.env.NEXT_PUBLIC_ASSET_URL + "products/" + product.image
            }
            threshold={500}
            effect="black and white"
            wrapperClassName="product-image"
          />
          {product?.images?.length >= 2 ? (
            <LazyLoadImage
              alt="product"
              src={
                process.env.NEXT_PUBLIC_ASSET_URL +
                "products/" +
                product.images[1]?.images
              }
              threshold={500}
              effect="black and white"
              wrapperClassName="product-image-hover"
            />
          ) : (
            ""
          )}
        </ALink>
        {product?.until && product?.until !== null ? (
          <div className="product-countdown is-countdown">
            <Countdown date={product.until} renderer={rendererOne} />
          </div>
        ) : (
          ""
        )}
      </figure>

      <div className="product-body">
        <div className="product-cat">
          <React.Fragment>
            <ALink
              href={{
                pathname: "#",
                query: { category: product.id_category },
              }}
            >
              {product.id_category}
            </ALink>
          </React.Fragment>
        </div>

        <h3 className="product-title">
          <ALink href={`#`}>{product.name}</ALink>
        </h3>

        {/* {
                    !product.qte || product.qte == 0 ?
                        <div className="product-price">
                            <span className="out-price">${ product.price }</span>
                        </div>
                        :
                        minPrice == maxPrice ?
                            <div className="product-price">${ minPrice.toFixed( 2 ) }</div>
                            :
                            product?.variants?.length == 0 ?
                                <div className="product-price">
                                    <span className="new-price">${ minPrice.toFixed( 2 ) }</span>
                                    <span className="old-price">${ maxPrice.toFixed( 2 ) }</span>
                                </div>
                                :
                                <div className="product-price">${ minPrice.toFixed( 2 ) }&ndash;${ maxPrice.toFixed( 2 ) }</div>
                } */}
        <div className="product-price">
          <span className="old-price">{product.price?.toFixed(2)} $</span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    wishlist: state.wishlist.data,
    comparelist: state.comparelist.data,
  };
};

export default connect(mapStateToProps, {
  ...wishlistAction,
  ...cartAction,
  ...compareAction,
  ...demoAction,
})(ProductTwelve);
