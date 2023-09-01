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

function ProductThirteen(props) {
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
      router.push("/user/wishlist");
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
    props.showQuickView(product.id);
  }

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
        {product.new ? (
          <span className="product-label label-new">New</span>
        ) : (
          ""
        )}

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
        {product.until && product.until !== null ? (
          <div className="product-countdown is-countdown">
            <Countdown date={product.until} renderer={rendererOne} />
          </div>
        ) : (
          ""
        )}
        {
          //product.stock && product.stock !== 0 ?
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
          //: ""
        }
      </figure>

      <div className="product-body">
        <div className="product-cat">
          <React.Fragment>
            <ALink
              href={{
                pathname: "#",
                query: { category: product.name_sous },
              }}
            >
              {product.name_sous}
            </ALink>
          </React.Fragment>
        </div>

        <h3 className="product-title">
          <ALink href={`#`}>{product.name_produit}</ALink>
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
          {product.price > product.price_red ? (
            <>
              <span className="new-price">
                {product.price_red?.toFixed(2)} $
              </span>
              <span className="line">{product.price?.toFixed(2)} $</span>
            </>
          ) : (
            <span className="old-price">{product.price?.toFixed(2)} $</span>
          )}
        </div>

        <div className="ratings-container">
          <div className="ratings">
            {/* <div className="ratings-val" style={ { width: product.ratings * 20 + '%' } }></div>
                        <span className="tooltip-text">{ product.ratings.toFixed( 2 ) }</span> */}
          </div>
          <span className="ratings-text">( {product.review} Reviews )</span>
        </div>

        {product?.variants?.length > 0 ? (
          <div className="product-nav product-nav-dots">
            <div className="row no-gutters">
              {product?.variants?.map((item, index) => (
                <ALink
                  href="#"
                  style={{ backgroundColor: item.color }}
                  key={index}
                >
                  <span className="sr-only">Color Name</span>
                </ALink>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
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
})(ProductThirteen);
