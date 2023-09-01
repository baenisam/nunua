import { Magnifier } from "react-image-magnifiers";
import React, { useState, useEffect } from "react";
import LightBox from "react-image-lightbox";

function GalleryDefault(props) {
  const {
    product,
    imageCollection,
    adClass = "product-gallery-vertical",
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (product) {
      setIsOpen(false);
      setPhotoIndex(0);
    }
  }, [product]);

  function moveNextPhoto() {
    setPhotoIndex((photoIndex + 1) % product.pictures.length);
  }

  function movePrevPhoto() {
    setPhotoIndex(
      (photoIndex + product.pictures.length - 1) % product.pictures.length
    );
  }

  function openLightBox() {
    let index = parseInt(
      document.querySelector(".product-main-image").getAttribute("index")
    );

    if (!index) {
      index = 0;
    }
    setIsOpen(true);
    setPhotoIndex(index);
  }

  function closeLightBox() {
    setIsOpen(false);
  }

  function changeBgImage(e, image, index) {
    let imgs = document.querySelectorAll(".product-main-image img");
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].src = image;
    }

    document
      .querySelector(".product-image-gallery .active")
      .classList.remove("active");

    document.querySelector(".product-main-image").setAttribute("index", index);
    e.currentTarget.classList.add("active");
  }

  if (!product) {
    return <div></div>;
  }

  return (
    <>
    {product?.emplacementid ?
    <>
      <div className={`product-gallery ${adClass}`}>
        <div className="row m-0">
          <figure className="product-main-image" style={{height:500}} index="0">


            <Magnifier
              imageSrc={process.env.NEXT_PUBLIC_ASSET_URL + "products/" + product.image}
              imageAlt="product"
              largeImageSrc={process.env.NEXT_PUBLIC_ASSET_URL + "products/" + product.image} // Optional
              dragToMove={false}
              mouseActivation="hover"
              cursorStyleActive="crosshair"
              id="product-zoom"
              className="zoom-image position-relative overflow-hidden h-100"
              style={{height:500, objectFit:'cover'}}
            
            />

            <button
              id="btn-product-gallery"
              className="btn-product-gallery"
              onClick={openLightBox}
            >
              <i className="icon-arrows"></i>
            </button>
          </figure>

          {imageCollection?.length > 0 && (
            <div id="product-zoom-gallery" className="product-image-gallery">
              {imageCollection?.map((item, index) => (
                <button
                  className={`product-gallery-item ${
                    0 === index ? "active" : ""
                  }`}
                  key={product.id + "-" + index}
                  onClick={(e) =>
                    changeBgImage(
                      e,
                      `${process.env.NEXT_PUBLIC_ASSET_URL + "products/" + item.images}`,
                      index
                    )
                  }
                >
                  <div className="img-wrapper h-100">
                    <img
                      src={process.env.NEXT_PUBLIC_ASSET_URL + "products/" + item.images}
                      alt="product back"
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {isOpen ? (
        <LightBox
          mainSrc={process.env.NEXT_PUBLIC_ASSET_URL + "products/"+ product.image}
          // nextSrc={ process.env.NEXT_PUBLIC_ASSET_URI + product.pictures[ ( photoIndex + 1 ) % product.pictures.length ].url }
          // prevSrc={ process.env.NEXT_PUBLIC_ASSET_URI + product.pictures[ ( photoIndex + product.pictures.length - 1 ) % product.pictures.length ].url }
          onCloseRequest={closeLightBox}
          onMovePrevRequest={moveNextPhoto}
          onMoveNextRequest={movePrevPhoto}
          reactModalStyle={{
            overlay: {
              zIndex: 1041,
            },
          }}
        />
      ) : (
        ""
      )}
      </> : 
      <>
       <div className={`product-gallery ${adClass}`}>
        <div className="row m-0">
          <figure className="product-main-image" index="0">
            {/* {
                            product.new ?
                                <span className="product-label label-new">New</span>
                                : ""
                        }

                        {
                            product.sale_price ?
                                <span className="product-label label-sale">Sale</span>
                                : ""
                        }

                        {
                            product.top ?
                                <span className="product-label label-top">Top</span>
                                : ""
                        } */}

            {!product.qte || product.qte == 0 ? (
              <span className="product-label label-out">En rupture de stock</span>
            ) : (
              ""
            )}

            <Magnifier
              imageSrc={process.env.NEXT_PUBLIC_ASSET_URL + "products/" + product.image}
              imageAlt="product"
              largeImageSrc={process.env.NEXT_PUBLIC_ASSET_URL + "products/" + product.image} // Optional
              dragToMove={false}
              mouseActivation="hover"
              cursorStyleActive="crosshair"
              id="product-zoom"
              className="zoom-image position-relative overflow-hidden"
              width={"100%"}
              height={"100%"}
              style={{ paddingTop: "100%" }}
            />

            <button
              id="btn-product-gallery"
              className="btn-product-gallery"
              onClick={openLightBox}
            >
              <i className="icon-arrows"></i>
            </button>
          </figure>

          {imageCollection?.length > 0 && (
            <div id="product-zoom-gallery" className="product-image-gallery">
              {imageCollection?.map((item, index) => (
                <button
                  className={`product-gallery-item ${
                    0 === index ? "active" : ""
                  }`}
                  key={product.id + "-" + index}
                  onClick={(e) =>
                    changeBgImage(
                      e,
                      `${process.env.NEXT_PUBLIC_ASSET_URL + "products/" + item.images}`,
                      index
                    )
                  }
                >
                  <div className="img-wrapper h-100">
                    <img
                      src={process.env.NEXT_PUBLIC_ASSET_URL + "products/" + item.images}
                      alt="product back"
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {isOpen ? (
        <LightBox
          mainSrc={process.env.NEXT_PUBLIC_ASSET_URL + "products/"+ product.image}
          // nextSrc={ process.env.NEXT_PUBLIC_ASSET_URI + product.pictures[ ( photoIndex + 1 ) % product.pictures.length ].url }
          // prevSrc={ process.env.NEXT_PUBLIC_ASSET_URI + product.pictures[ ( photoIndex + product.pictures.length - 1 ) % product.pictures.length ].url }
          onCloseRequest={closeLightBox}
          onMovePrevRequest={moveNextPhoto}
          onMoveNextRequest={movePrevPhoto}
          reactModalStyle={{
            overlay: {
              zIndex: 1041,
            },
          }}
        />
      ) : (
        ""
      )}
      </>}
    </>
  );
}

export default React.memo(GalleryDefault);
