import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MetaDocument from "~/components/Meta";
import ALink from "~/components/features/alink";
import { AiTwotoneDelete } from "react-icons/ai";
import PageHeader from "~/components/features/page-header";

import { actions as wishlistAction } from "~/store/wishlist";
import ProtectedLayout from "~/components/user/ProtectedLayout";
import { actions as cartAction } from "~/store/cart";

function Wishlist(props) {
  const [wishItems, setWishItems] = useState([]);

  useEffect(() => {
    setWishItems(
      props.wishlist.reduce((acc, product) => {
        let max = 0;
        let min = 999999;
        product?.variants?.map((item) => {
          if (min > item.price) min = item.price;
          if (max < item.price) max = item.price;
        }, []);

        if (product?.variants?.length == 0) {
          min = product.sale_price ? product.sale_price : product.price;
          max = product.price;
        }

        return [
          ...acc,
          {
            ...product,
            minPrice: min,
            maxPrice: max,
          },
        ];
      }, [])
    );
  }, [props.wishlist]);

  function moveToCart(product) {
    //props.removeFromWishlist(product);
    props.addToCart(product);
  }

  return (
    <ProtectedLayout>
      <main className="main">
        <MetaDocument title="Mes favoris" />
        {/* <PageHeader title="Mes favoris" subTitle="" /> */}
        <nav className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <ALink href="/">Accueil</ALink>
              </li>
              <li className="breadcrumb-item">
                <ALink href="/user/dashboard">Utilisateur</ALink>
              </li>
              <li className="breadcrumb-item active">Favoris</li>
            </ol>
          </div>
        </nav>

        <div className="page-content pb-5">
          {wishItems.length > 0 ? (
            <div className="container">
              <table className="table table-wishlist table-mobile">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Stock Status</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {wishItems.map((product, index) => (
                    <tr key={index}>
                      <td className="product-col">
                        <div className="product">
                          <figure className="product-media">
                            <ALink
                              href={`/product/${product.id}`}
                              className="product-image"
                            >
                              <img
                                src={
                                  process.env.NEXT_PUBLIC_ASSET_URL +
                                  "products/" +
                                  product.image
                                }
                                alt="product"
                              />
                            </ALink>
                          </figure>

                          <h4 className="product-title">
                            <ALink href={`/product/${product.id}`}>
                              {product.name_produit}
                            </ALink>
                          </h4>
                        </div>
                      </td>
                      <td className="price-col">
                        {product.stock == 0 ? (
                          <div className="product-price d-inline-block mb-0">
                            <span className="out-price">
                              ${product.price_red.toFixed(2)}
                            </span>
                          </div>
                        ) : product?.price == product.price_red ? (
                          <div className="product-price d-inline-block mb-0">
                            {product.price_red.toFixed(2)}$
                          </div>
                        ) : product?.variants?.length == 0 ? (
                          <div className="product-price d-inline-block mb-0">
                            <span className="new-price">
                              ${product.minPrice.toFixed(2)}
                            </span>
                            <span className="old-price">
                              ${product.maxPrice.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <div className="product-price d-inline-block mb-0">
                            ${product.price_red.toFixed(2)}&ndash;$
                          </div>
                        )}
                      </td>
                      <td className="stock-col">
                        <span
                          className={`${
                            product.qte <= 0 ? "out-of-stock" : "in-stock"
                          }`}
                        >
                          {product.qte <= 0 ? "Indisponible" : "Disponible"}
                        </span>
                      </td>
                      <td className="action-col">
                        <div className="dropdown">
                          {product?.variants?.length > 0 ||
                          product.stock == 0 ? (
                            <ALink
                              href={`/product/default/${product.slug}`}
                              className="btn btn-block btn-outline-primary-2 btn-select"
                            >
                              <i className="icon-list-alt"></i>
                              {product.stock == "0" ? "read more" : "select"}
                            </ALink>
                          ) : (
                            <button
                              style={{ borderRadius: 30 }}
                              className="btn btn-block btn-outline-primary-2"
                              onClick={(e) => moveToCart(product)}
                            >
                              <i className="icon-cart-plus"></i>
                              Ajouter au panier
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="remove-col">
                        <button
                          className="btn-remove"
                          onClick={(e) => props.removeFromWishlist(product)}
                        >
                          <AiTwotoneDelete color="red" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="wishlist-share">
                <div className="social-icons social-icons-sm mb-2">
                  <label className="social-label">Share on:</label>
                  <ALink href="#" className="social-icon" title="Facebook">
                    <i className="icon-facebook-f"></i>
                  </ALink>
                  <ALink href="#" className="social-icon" title="Twitter">
                    <i className="icon-twitter"></i>
                  </ALink>
                  <ALink href="#" className="social-icon" title="Instagram">
                    <i className="icon-instagram"></i>
                  </ALink>
                  <ALink href="#" className="social-icon" title="Youtube">
                    <i className="icon-youtube"></i>
                  </ALink>
                  <ALink href="#" className="social-icon" title="Pinterest">
                    <i className="icon-pinterest"></i>
                  </ALink>
                </div>
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="text-center">
                <i
                  className="icon-heart-o wishlist-empty d-block"
                  style={{ fontSize: "15rem", lineHeight: "1" }}
                ></i>
                <span className="d-block mt-2">Aucun produit</span>
                <ALink href="/" className="btn btn-primary">
                  RETOUR A LA BOUTIQUE
                </ALink>
              </div>
            </div>
          )}
        </div>
      </main>
    </ProtectedLayout>
  );
}

const mapStateToProps = (state) => ({
  wishlist: state.wishlist.data,
});

export default connect(mapStateToProps, { ...wishlistAction, ...cartAction })(
  Wishlist
);