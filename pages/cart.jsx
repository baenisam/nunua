import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { UserContext } from "~/context/UserContext";

import ALink from "~/components/features/alink";
import LoginModal from "~/components/features/modals/login-modal";
import Qty from "~/components/features/qty";
import {AiTwotoneDelete} from 'react-icons/ai'
import GlobalContext from "~/context/GlobalContext";
import PageHeader from "~/components/features/page-header";
import MetaDocument from "~/components/Meta";

import { actions as cartAction } from "~/store/cart";
import { cartPriceTotal } from "~/utils/index";

function Cart(props) {
  const [cartList, setCartList] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const { setRedirection } = useContext(GlobalContext);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const {
    dispatch,
    state: { userInfo },
  } = useContext(UserContext);
  useEffect(() => {
    setCartList(props.cartItems);
  }, [props.cartItems]);

  useEffect(() => {
    setCartList(props.cartItems);
  }, [props.cartItems]);

  function onChangeShipping(value) {
    setShippingCost(value);
  }

  const handleOpenLogin = (e) => {
 
    setRedirection("/user/checkout")
    setModalOpen(true);
  //setModalOpen(true);
};
  function changeQty(value, index) {
    setCartList(
      cartList.map((item, ind) => {
        if (ind == index)
          return {
            ...item,
            qty: value,
            sum: (item.sale_price ? item.sale_price : item.price) * value,
          };
        return item;
      })
    );
  }

  function updateCart(e) {
    let button = e.currentTarget;
    button.querySelector(".icon-refresh").classList.add("load-more-rotating");

    setTimeout(() => {
      props.updateCart(cartList);
      button
        .querySelector(".icon-refresh")
        .classList.remove("load-more-rotating");
    }, 400);
  }

  return (
    <div className="main">
          {modalOpen && <LoginModal open={modalOpen} setOpen={setModalOpen} />}
      <MetaDocument title="Panier" />
      <nav className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href="#">Shop</ALink>
            </li>
            <li className="breadcrumb-item active">Shopping Cart</li>
          </ol>
        </div>
      </nav>

      <div className="page-content pb-5">
        <div className="cart">
          <div className="container">
          {cartList.length > 0 ? (
              <div className="row">
                <div className="col-lg-9">
                  <table className="table table-cart table-mobile">
                    <thead>
                      <tr>
                        <th>Produit</th>
                        <th>Prix</th>
                        <th>Quantité</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {cartList.length > 0 ? (
                        cartList.map((item, index) => (
                          <tr key={index}>
                            <td className="product-col">
                              <div className="product">
                                <figure className="product-media">
                                  <ALink
                                    href={`/product/${item.id}`}
                                    className="product-image"
                                  >
                                    <img
                                      src={
                                        process.env.NEXT_PUBLIC_ASSET_URL +
                                        "products/" +
                                        item.image
                                      }
                                      alt="product"
                                    />
                                  </ALink>
                                </figure>

                                <h4 className="product-title">
                                  <ALink href={`/product/${item.id}`}>
                                    {item.name_produit}
                                  </ALink>
                                </h4>
                              </div>
                            </td>

                            <td className="price-col">
                              $
                              {
                                item.price_red.toFixed(2)
                                //     item.price ?
                                //         item.price.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } )
                                //         :
                                //         item.price.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } )

                                //
                              }
                            </td>

                            <td className="quantity-col">
                              <Qty
                                value={item.qty}
                                changeQty={(current) =>
                                  changeQty(current, index)
                                }
                                adClass="cart-product-quantity"
                              ></Qty>
                            </td>

                            <td className="total-col">
                              ${item.sum.toFixed(2)}
                            </td>

                            <td className="remove-col">
                              <button
                                className="btn-remove"
                                onClick={() => props.removeFromCart(item)}
                              >
                                <AiTwotoneDelete color="red"/>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td>
                            <p className="pl-2 pt-1 pb-1"> Aucun produit </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  <div className="cart-bottom">
                    {/* <div className="cart-discount">
                      <form action="#">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="coupon code"
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-outline-primary-2"
                              type="submit"
                            >
                              <i className="icon-long-arrow-right"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div> */}

                    <button
                      className="btn btn-primary"
                      style={{borderRadius:20}}
                      onClick={updateCart}
                    >
                      <span>METTRE A JOUR LE PENIER</span>
                      <i className="icon-refresh"></i>
                    </button>
                  </div>
                </div>
                <aside className="col-lg-3">
                  <div className="summary summary-cart" style={{borderRadius:20}}>
                    <h3 className="summary-title">
                      Récapitulatif de la commande
                    </h3>

                    <table className="table table-summary">
                      <tbody>
                        <tr className="summary-subtotal">
                          <td>Sous-total:</td>
                          <td>
                            $
                            {cartPriceTotal(props.cartItems).toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </td>
                        </tr>
                        <tr className="summary-shipping">
                          <td>Expédition:</td>
                          <td>&nbsp;</td>
                        </tr>

                        <tr className="summary-shipping-row">
                          <td>
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id="free-shipping"
                                name="shipping"
                                className="custom-control-input"
                                onChange={(e) => onChangeShipping(0)}
                                defaultChecked={true}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="free-shipping"
                              >
                                Livraison gratuite
                              </label>
                            </div>
                          </td>
                          <td>$0.00</td>
                        </tr>

                        <tr className="summary-shipping-row">
                          <td>
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id="standard-shipping"
                                name="shipping"
                                className="custom-control-input"
                                onChange={(e) => onChangeShipping(10)}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="standard-shipping"
                              >
                                Standard:
                              </label>
                            </div>
                          </td>
                          <td>$10.00</td>
                        </tr>

                        <tr className="summary-shipping-row">
                          <td>
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id="express-shipping"
                                name="shipping"
                                className="custom-control-input"
                                onChange={(e) => onChangeShipping(20)}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="express-shipping"
                              >
                                Express:
                              </label>
                            </div>
                          </td>
                          <td>$20.00</td>
                        </tr>

                        {/* <tr className="summary-shipping-estimate">
                          <td>
                            Estimation pour votre pays
                            <br />{" "}
                            <ALink href="/shop/dashboard">
                              Changez l'adresse de livrason
                            </ALink>
                          </td>
                          <td>&nbsp;</td>
                        </tr> */}

                        <tr className="summary-total">
                          <td>Total général:</td>
                          <td>
                            $
                            {(
                              cartPriceTotal(props.cartItems) + shippingCost
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {!userInfo?.token ? (
                      <button
                      style={{borderRadius:20}}
                        onClick={handleOpenLogin}
                        className="btn btn-primary btn-order btn-block"
                      >
                        CONTINUEZ ET PAYEZ
                      </button>
                    ) : (
                      <ALink
                      style={{borderRadius:20}}
                        className="btn btn-primary btn-order btn-block"
                        href="/user/checkout"
                      >
                        CONTINUEZ ET PAYEZ
                      </ALink>
                    )}
                  </div>

                  <ALink
                    href="/"
                    style={{borderRadius:20}}
                    className="btn btn-outline-dark-2 btn-block mb-3"
                  >
                    <span>CONTINUE SHOPPING</span>
                    <i className="icon-refresh"></i>
                  </ALink>
                </aside>
              </div>
            ) : (
              <div className="row">
                <div className="col-12">
                  <div className="cart-empty-page text-center">
                    <i
                      className="cart-empty icon-shopping-cart"
                      style={{ lineHeight: 1, fontSize: "15rem" }}
                    ></i>
                    <p className="px-3 py-2 cart-empty mb-3">
                      Aucun produit ajouté au panier
                    </p>
                    <p className="return-to-shop mb-0">
                      <ALink href="/" className="btn btn-primary">
                        RETOUR A LA BOUTIQUE
                      </ALink>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartItems: state.cartlist.data,
});

export default connect(mapStateToProps, { ...cartAction })(Cart);
