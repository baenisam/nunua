import Modal from "react-modal";
import { connect } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Magnifier } from "react-image-magnifiers";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import ProductServices from "~/services/ProductServices";
import useAsync from "~/Hooks/useAsync";
import OwlCarousel from "~/components/features/owl-carousel";
import DetailOne from "~/components/partials/product/details/detail-one";

import withApollo from "~/server/apollo";
import { GET_PRODUCT } from "~/server/queries";

import { actions as demoAction } from "~/store/demo";
import React, { useState, useEffect } from "react";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(51,51,51,0.6)",
    zIndex: "9000",
  },
};

Modal.setAppElement("body");

function QuickViewModal(props) {
  const { slug } = props;
  if (!slug) {
    return <div></div>;
  }
  const { data, loading, error } = useAsync(() => ProductServices.oneProduct(slug));
  const product = data?.Detail_Product;
  const imageCollection = data?.ImageProduit;
  const router = useRouter();
  const [carouselRef, setCarouselRef] = useState(null);

  const events = {
    onTranslate: function (e) {
      let items = document.querySelectorAll(
        ".quickView-content .product-gallery-item"
      );
      document
        .querySelector(".quickView-content .product-gallery-item.active")
        .classList.remove("active");
      items[e.item.index].classList.add("active");
    },
  };

  useEffect(() => {
    router.events.on("routeChangeStart", closeModal);
    carouselRef && carouselRef.current && carouselRef.current.goTo(0);

    return () => {
      router.events.off("routeChangeStart", closeModal);
    };
  }, []);

  function closeModal() {
    if (document.querySelector(".ReactModal__Content")) {
      document
        .querySelector(".ReactModal__Content")
        .classList.remove("ReactModal__Content--after-open");
    }

    if (document.querySelector(".ReactModal__Overlay")) {
      document.querySelector(".ReactModal__Overlay").style.opacity = "0";
    }

    setTimeout(() => {
      props.hideQuick();
    }, 250);
  }

  function changeBgImage(e, index) {
    document
      .querySelector(".quickView-content .product-gallery-item.active")
      .classList.remove("active");
    e.currentTarget.classList.add("active");
    carouselRef.current.goTo(index);
  }

  if (!slug || error) {
    return <div></div>;
  }
  return (
    <>
      <Modal
        isOpen={props.modalShow}
        onRequestClose={closeModal}
        className="container quickView-container"
        overlayClassName="d-flex align-items-center justify-content-center"
        shouldReturnFocusAfterClose={false}
        closeTimeoutMS={100}
        contentLabel="QuickView"
        style={customStyles}
        id="product-quickview"
      >
        <div className="modal-content">
          <div className="quickView-content horizontal skeleton-body">
            <div
              className={`row skel-pro-single skel-quickview mb-0 ${
                loading ? "" : "loaded"
              }`}
            >
              <div className="col-lg-6 p-0 pr-lg-2 mb-2 mb-lg-0">
                <div className="skel-product-gallery"></div>

                {!loading ? (
                  <>
                    <div className="product-lg mb-1 position-relative">
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
                        <span className="product-label label-out">
                          En rupture de stock
                        </span>
                      ) : (
                        ""
                      )}
                      <OwlCarousel
                        adClass="product-gallery-carousel owl-full owl-nav-dark cols-1 cols-md-2 cols-lg-3"
                        onChangeRef={setCarouselRef}
                        events={events}
                        options={{ dots: false, nav: false }}
                      >
                        {imageCollection.map((item, index) => (
                          <Magnifier
                            imageSrc={
                              process.env.NEXT_PUBLIC_ASSET_URL + "products/" + item.images
                            }
                            imageAlt="product"
                            largeImageSrc={
                              process.env.NEXT_PUBLIC_ASSET_URL + "products/" + item.images
                            } // Optional
                            dragToMove={false}
                            mouseActivation="hover"
                            cursorStyleActive="crosshair"
                            className="product-gallery-image"
                            // width={"100%"}
                            // height={"100%"}
                            style={{ paddingTop: "100%" }}
                            key={"gallery-" + index}
                          />
                        ))}
                      </OwlCarousel>
                    </div>

                    <div className="product-sm row px-2" id="owl-dots">
                      {imageCollection.map((item, index) => (
                        <button
                          className={`product-gallery-item mb-0 ${
                            0 === index ? "active" : ""
                          }`}
                          key={product.id + "-" + index}
                          onClick={(e) => changeBgImage(e, index)}
                        >
                          <div className="lazy-media">
                            <figure className="mb-0">
                              <div className="lazy-overlay"></div>
                              <LazyLoadImage
                                alt="Thumbnail"
                                src={
                                  process.env.NEXT_PUBLIC_ASSET_URL + "products/" +
                                  imageCollection[index].images
                                }
                                width="100%"
                                height="auto"
                                className="d-block"
                              />
                            </figure>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-6 quickview-desc pl-0 pl-lg-4 pr-0">
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
        </div>

        <button
          title="Close (Esc)"
          type="button"
          className="mfp-close"
          onClick={closeModal}
        >
          <span>×</span>
        </button>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    slug: state.demo.single,
    modalShow: state.demo.quickShow,
  };
};

export default withApollo({ ssr: typeof window == "undefined" })(
  connect(mapStateToProps, { ...demoAction })(QuickViewModal)
);
