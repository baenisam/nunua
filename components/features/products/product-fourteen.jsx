import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ALink from "~/components/features/alink";

import { actions as wishlistAction } from "~/store/wishlist";
import { actions as cartAction } from "~/store/cart";
import { actions as compareAction } from "~/store/compare";
import { actions as demoAction } from "~/store/demo";

import { isInWishlist, isInCompare } from "~/utils";

function ProductFourteen(props) {
  const router = useRouter();
  const { product, wishlist } = props;
  return (
    <div className="product product-7 text-center w-100">
      <figure className="product-media">
        {/* {
                    product.new ?
                        <span className="product-label label-new">New</span>
                        : ""
                }

                {
                    product.price_red ?
                        <span className="product-label label-sale">Sale</span>
                        : ""
                }

                {
                    product.top ?
                        <span className="product-label label-top">Top</span>
                        : ""
                }

                {
                    !product.stock || product.stock == 0 ?
                        <span className="product-label label-out">Out of Stock</span>
                        : ""
                } */}

        <ALink
          href={
            product?.emplacementid
              ? `/adds/${product.id}`
              : `/product/${product.id}`
          }
        >
          <LazyLoadImage
            loading="lazy"
            style={{
              resize: "both",
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
            alt="product"
            src={
              process.env.NEXT_PUBLIC_ASSET_URL + "products/" + product.image
            }
            threshold={500}
            effect="black and white"
            wrapperClassName="product-image"
          />
          {product.images.length >= 2 ? (
            <LazyLoadImage
              loading="lazy"
              style={{
                resize: "both",
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
              alt="product"
              src={
                process.env.NEXT_PUBLIC_ASSET_URL +
                "products/" +
                product.images[0].images
              }
              threshold={500}
              effect="black and white"
              wrapperClassName="product-image-hover"
            />
          ) : (
            ""
          )}
        </ALink>
        {!product?.emplacementid && (
          <div className="product-action-vertical">
            {isInWishlist(wishlist, product) ? (
              <ALink
                href="/shop/wishlist"
                className="btn-product-icon btn-wishlist btn-expandable added-to-wishlist"
              >
                <span>go to wishlist</span>
              </ALink>
            ) : (
              <a
                href="#"
                className="btn-product-icon btn-wishlist btn-expandable"
              >
                <span>add to wishlist</span>
              </a>
            )}
          </div>
        )}

        {product.qte && product.qte !== 0 ? (
          <div className="product-action">
            {product.variants.length > 0 ? (
              <ALink
                href={`/product/${product.id}`}
                className="btn-product btn-cart btn-select"
              >
                <span>select options</span>
              </ALink>
            ) : (
              <button className="btn-product btn-cart" onClick={onCartClick}>
                <span>add to cart</span>
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </figure>

      <div className="product-body">
        <div className="product-cat">
          <React.Fragment key={product.id}>
            <ALink
              href={{
                pathname: "/shop",
                query: { category: product.id_category },
              }}
            >
              {product?.category?.name}
            </ALink>
          </React.Fragment>
        </div>

        <h3 className="product-title">
          <ALink
            href={
              product?.emplacementid
                ? `/adds/${product.id}`
                : `/product/${product.id}`
            }
          >
            {product.name}
          </ALink>
        </h3>
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
})(ProductFourteen);
