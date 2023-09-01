import { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import SlideToggle from "react-slide-toggle";
import Cookies from "js-cookie";
import ALink from "~/components/features/alink";
import MetaDocument from "~/components/Meta";
import { Spinner } from "reactstrap";
import GlobalContext from "~/context/GlobalContext";
import { FormFeedback, Input } from "reactstrap";
import useOrderSubmit from "~/Hooks/useOrderSubmit";
import Accordion from "~/components/features/accordion/accordion";
import Card from "~/components/features/accordion/card";

import * as Yup from "yup";
import { useFormik } from "formik";
import { cartPriceTotal } from "~/utils/index";
import ProtectedLayout from "~/components/user/ProtectedLayout";

function Checkout(props) {
  const { cartlist } = props;
  const { submitHandler, loading } = useOrderSubmit({cart:cartlist});
  const { setPaymentMethod } = useContext(GlobalContext);
  const [shippingInfo, setShippingInfo] = useState(
    Cookies.get("billingInformations")
      ? JSON.parse(Cookies.get("billingInformations"))
      : null
  );

  useEffect(() => {
    // const shippingInfo = null
    // if(Cookies.get('shippingInformations')){
    //   shippingInfo = JSON.parse(Cookies.get('shippingInformations'))
    // }
  }, []);

  function clearOpacity() {
    if (document.querySelector("#checkout-discount-input").value == "")
      document
        .querySelector("#checkout-discount-form label")
        .removeAttribute("style");
  }

  function addOpacity(e) {
    e.currentTarget.parentNode
      .querySelector("label")
      .setAttribute("style", "opacity: 0");
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: shippingInfo ? shippingInfo.email : "",
      first_name: shippingInfo ? shippingInfo.first_name : "",
      last_name: shippingInfo ? shippingInfo.last_name : "",
      phone: shippingInfo ? shippingInfo.phone : "",
      adresse: shippingInfo ? shippingInfo.adresse : "",
      ville: shippingInfo ? shippingInfo.ville : "",
      pays: shippingInfo ? shippingInfo.pays : "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Ce champs est requis")
        .email("Adresse email incorrecte"),
      first_name: Yup.string().required("Ce champs est requis"),
      last_name: Yup.string().required("Ce champs est requis"),
      phone: Yup.string().required("Ce champs est requis"),
      adresse: Yup.string().required("Ce champs est requis"),
      ville: Yup.string().required("Ce champs est requis"),
      pays: Yup.string().required("Ce champs est requis"),
    }),
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  function handleOnClick(item) {
    setPaymentMethod(item);
  }

  return (
    <ProtectedLayout>
      <div className="main">
        {/* <PageHeader title="Checkout" subTitle="Shop" /> */}
        <MetaDocument title="Checkout" />
        <nav className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <ALink href="/">Accueil</ALink>
              </li>
              <li className="breadcrumb-item">
                <ALink href="/cart">Panier</ALink>
              </li>
              <li className="breadcrumb-item active">Checkout</li>
            </ol>
          </div>
        </nav>

        <div className="page-content">
          <div className="checkout">
            <div className="container">
              {/* <div className="checkout-discount">
                            <form action="#" id="checkout-discount-form">
                                <input type="text" className="form-control" required id="checkout-discount-input" onClick={ addOpacity } />
                                <label htmlFor="checkout-discount-input" className="text-truncate">Have a coupon? <span>Click here to enter your code</span></label>
                            </form>
                        </div> */}

              <form
                action="#"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="row">
                  <div className="col-lg-8">
                    <h2 className="checkout-title">
                      Informations de livraison
                    </h2>
                    <div className="row">
                      <div className="col-sm-12">
                        <label>Nom complet du receveur*</label>
                        <Input
                          name="first_name"
                          placeholder=""
                          className="form-control"
                          id="validationCustom02"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.first_name || ""}
                          invalid={
                            validation.touched.first_name &&
                            validation.errors.first_name
                              ? true
                              : false
                          }
                        />
                        {validation.touched.first_name &&
                        validation.errors.first_name ? (
                          <FormFeedback type="invalid">
                            {validation.errors.first_name}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <label>Téléphone du receveur*</label>
                        <Input
                          name="phone"
                          placeholder=""
                          className="form-control"
                          id="validationCustom02"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.phone || ""}
                          invalid={
                            validation.touched.phone && validation.errors.phone
                              ? true
                              : false
                          }
                        />
                        {validation.touched.phone && validation.errors.phone ? (
                          <FormFeedback type="invalid">
                            {validation.errors.phone}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="col-sm-6">
                        <label>Email du receveur *</label>
                        <Input
                          name="email"
                          placeholder=""
                          className="form-control"
                          id="validationCustom02"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <label>Pays du receveur*</label>
                        <Input
                          name="pays"
                          placeholder=""
                          className="form-control"
                          id="validationCustom02"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.pays || ""}
                          invalid={
                            validation.touched.pays && validation.errors.pays
                              ? true
                              : false
                          }
                        />
                        {validation.touched.pays && validation.errors.pays ? (
                          <FormFeedback type="invalid">
                            {validation.errors.pays}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="col-sm-6">
                        <label>Ville du receveur*</label>
                        <Input
                          name="ville"
                          placeholder=""
                          className="form-control"
                          id="validationCustom02"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.ville || ""}
                          invalid={
                            validation.touched.ville && validation.errors.ville
                              ? true
                              : false
                          }
                        />
                        {validation.touched.ville && validation.errors.ville ? (
                          <FormFeedback type="invalid">
                            {validation.errors.ville}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-12">
                        <label>Adresse precise du receveur*</label>
                        <textarea
                          name="adresse"
                          placeholder=""
                          className="form-control"
                          id="validationCustom02"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.adresse || ""}
                          invalid={
                            validation.touched.adresse &&
                            validation.errors.adresse
                              ? true
                              : false
                          }
                        ></textarea>
                        {validation.touched.adresse &&
                        validation.errors.adresse ? (
                          <FormFeedback type="invalid">
                            {validation.errors.adresse}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <aside className="col-lg-4">
                    <div className="summary" style={{ borderRadius: 30 }}>
                      <h3 className="summary-title">Votre commande</h3>

                      <table className="table table-summary">
                        <thead>
                          <tr>
                            <th>Produits</th>
                            <th>Quantité</th>
                            <th>Total</th>
                          </tr>
                        </thead>

                        <tbody>
                          {cartlist.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {" "}
                                <ALink href={`/product/${item.id}`}>
                                  {item.name_produit}
                                </ALink>
                              </td>
                              <td>{item.qty} {item.mesure?.name}</td>
                              <td>
                                $
                                {item.sum.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </td>
                            </tr>
                          ))}
                          <tr className="summary-subtotal">
                            <td>Sous-total:</td>
                            <td>
                              $
                              {cartPriceTotal(cartlist).toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </td>
                          </tr>
                          {/* <tr>
                                                    <td>Shipping:</td>
                                                    <td>Free Shipping</td>
                                                </tr> */}
                          <tr className="summary-total">
                            <td>Total:</td>
                            <td>
                              $
                              {cartPriceTotal(cartlist).toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <Accordion type="checkout">
                        {/* <Card title="Direct bank transfer" expanded={true}>
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        will not be shipped until the funds have cleared in our
                        account.
                      </Card>

                      <Card title="Check payments">
                        Ipsum dolor sit amet, consectetuer adipiscing elit.
                        Donec odio. Quisque volutpat mattis eros. Nullam
                        malesuada erat ut turpis.
                      </Card> */}
                        {[
                          { name: "Cash", isSub: false },
                          { name: "Monnaie mobile", isSub: true },
                        ].map((item) => (
                          <Card
                            onClick={() => handleOnClick(item)}
                            title={item.name}
                          >
                            {item.isSub && (
                              <>
                                <label>Numéro de téléphone *</label>
                                <input type="text" className="form-control" />
                              </>
                            )}
                          </Card>
                        ))}
                        {/* 
                      <Card title="Monnaie mobile">
                        <label>Numéro de téléphone *</label>
                        <input type="text" className="form-control" />
                      </Card> */}

                        {/* <Card title="Credit Card (Stripe)">
                        <img
                          src="images/payments-summary.png"
                          alt="payments cards"
                          className="mb-1"
                        />
                        Donec nec justo eget felis facilisis fermentum.Lorem
                        ipsum dolor sit amet, consectetuer adipiscing elit.
                        Donec odio. Quisque volutpat mattis eros. Lorem ipsum
                        dolor sit ame.
                      </Card> */}
                      </Accordion>
                      {loading ? (
                        <button
                          disabled
                          type="submit"
                          className="btn btn-primary btn-order btn-block"
                          style={{ borderRadius: 30 }}
                        >
                          <Spinner aria-label="hidden" type="grow" size="sm">
                            {""}
                          </Spinner>
                          {"   "}
                          <span>Patientez...</span>
                        </button>
                      ) : (
                        <button
                          disabled={loading}
                          type="submit"
                          className="btn btn-primary btn-order btn-block"
                          style={{ borderRadius: 30 }}
                        >
                          <span className="btn-text">Passer la commande</span>
                          <span className="btn-hover-text">
                            Passer la commande
                          </span>
                        </button>
                      )}
                    </div>
                  </aside>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}

export const mapStateToProps = (state) => ({
  cartlist: state.cartlist.data,
});

export default connect(mapStateToProps)(Checkout);
