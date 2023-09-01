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

function ProductSix(props) {
  const router = useRouter();
  const { product, wishlist } = props;
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(99999);

  useEffect(() => {
    let min = minPrice;
    let max = maxPrice;
    product?.variants?.map((item) => {
      if (min > item.price) min = item.price;
      if (max < item.price) max = item.price;
    }, []);

    if (product?.variants?.length == 0) {
      min = product.sale_price ? product.sale_price : product.price;
      max = product.price;
    }

    setMinPrice(min);
    setMaxPrice(max);
  }, []);

  function onCartClick(e) {
    e.preventDefault();
    props.addToCart(product);
  }

  function onWishlistClick(e) {
    e.preventDefault();
    if (!isInWishlist(props.wishlist, product)) {
      props.addToWishlist(product);
    } else {
      router.push("/pages/wishlist");
    }
  }

  function onCompareClick(e) {
    e.preventDefault();
    if (!isInCompare(props.comparelist, product)) {
      props.addToCompare(product);
    }
  }

  function onQuickView(e) {
    e.preventDefault();
    props.showQuickView(product.slug);
  }

  return !product.price_red ? (
    <div className="product product-5 text-center">
      <figure className="product-media">
        <ALink href={`/adds/${product.id}`}>
          <LazyLoadImage
            style={{ resize: "both", height: "100%",objectFit:'cover'}}
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
              style={{ resize: "both", height: "100%",objectFit:'cover' }}
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
      </figure>

      <div className="product-body">
        <h3 className="product-title">
          <ALink href={`/adds/${product.id}`}>{product.name_produit}</ALink>
        </h3>

        <div className="product-price">
          <span className="out-price">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="product product-5 text-center">
      <figure className="product-media">
        {product.price > product.price_red ? (
          <span className="product-label label-sale">
            -{" "}
            {(
              (Number(product.price - product.price_red) * 100) /
              product.price
            ).toFixed(2)}{" "}
            %
          </span>
        ) : (
          ""
        )}

        {product.etat_top ? (
          <span className="product-label label-top">Top</span>
        ) : (
          ""
        )}

        {!product.qte || product.qte == 0 ? (
          <span className="product-label label-out">En rupture de stock</span>
        ) : (
          ""
        )}

        <ALink href={`/product/${product.id}`}>
          <LazyLoadImage
            style={{ resize: "both", height: "100%",objectFit:'cover' }}
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
              style={{ resize: "both", height: "100%",objectFit:'cover' }}
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

        <div className="product-action-vertical">
          {isInWishlist(wishlist, product) ? (
            <ALink
              href="/user/wishlist"
              className="btn-product-icon btn-wishlist added-to-wishlist"
            >
              <span>Mes favoris</span>
            </ALink>
          ) : (
            <a
              href="#"
              className="btn-product-icon btn-wishlist btn-expandable"
              onClick={onWishlistClick}
            >
              <span>Ajouter aux favoris</span>
            </a>
          )}
          <a
            href="#"
            className="btn-product-icon btn-quickview"
            title="Quick View"
            onClick={onQuickView}
          >
            <span>Voir</span>
          </a>
        </div>

        {product.qte && product.qte !== 0 ? (
          <div className="product-action">
            {product?.variants?.length > 0 ? (
              <ALink
                href={`/product/${product.id}`}
                className="btn-product btn-cart btn-select"
              >
                <span>select options</span>
              </ALink>
            ) : (
              <button className="btn-product btn-cart" onClick={onCartClick}>
                <span>Ajouter au panier</span>
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </figure>

      <div className="product-body">
        <h3 className="product-title">
          <ALink href={`/product/${product.id}`}>{product.name_produit}</ALink>
        </h3>

        {product.qte || product.qte > 0 ? (
          product.price == product.price_red ? (
            <div className="product-price">
              <span className="out-price">${product.price.toFixed(2)}</span>
            </div>
          ) : (
            <div className="product-price">
              <span className="new-price">{product.price_red.toFixed(2)} $</span>
              <span className="old-price">{product.price.toFixed(2)} $</span>
            </div>
          )
        ):null}
        
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
})(ProductSix);
