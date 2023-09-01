import { useEffect, useContext, useState, useRef } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import MetaDocument from "~/components/Meta";
import LoginModal from "~/components/features/modals/login-modal";
import ALink from "~/components/features/alink";
import GlobalContext from "~/context/GlobalContext";
import Qty from "~/components/features/qty";

import { actions as wishlistAction } from "~/store/wishlist";
import { actions as cartAction } from "~/store/cart";

import { canAddToCart, isInWishlist } from "~/utils";
import { UserContext } from "~/context/UserContext";
import { notifyError } from "~/utils/toast";
import {BsWhatsapp} from 'react-icons/bs'

function DetailOne(props) {
  const router = useRouter();
  const ref = useRef(null);
  const { product } = props;
  const { setRedirection,open, setOpen } = useContext(GlobalContext);
  const {
    state: { userInfo },
  } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [qty2, setQty2] = useState(1);
  const [colorArray, setColorArray] = useState([]);
  const [sizeArray, setSizeArray] = useState([]);
  const [variationGroup, setVariationGroup] = useState([]);
  const [showPhone, setShowPhone] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState({
    color: null,
    colorName: null,
    price: null,
    size: "",
  });
  const [showClear, setShowClear] = useState(false);
  const [showVariationPrice, setShowVariationPrice] = useState(false);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(99999);

  const handleOpenLogin = (e) => {
    if(userInfo?.token){
      router.push("/user/create-add")
    } else {
      setRedirection("/user/create-add")
      setOpen(true);
    }

};
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  useEffect(() => {
    let min = 99999;
    let max = 0;

    setVariationGroup(
      product?.variants?.reduce((acc, cur) => {
        cur.size.map((item) => {
          acc.push({
            color: cur.color,
            colorName: cur.color_name,
            size: item.name,
            price: cur.price,
          });
        });
        if (min > cur.price) min = cur.price;
        if (max < cur.price) max = cur.price;
        return acc;
      }, [])
    );

    if (product?.variants?.length == 0) {
      min = product.price_red ? product.price_red : product.price_red;
      max = product.price_red;
    }

    setMinPrice(min);
    setMaxPrice(max);
  }, [product]);

  useEffect(() => {
    setSelectedVariant({ color: null, colorName: null, price: null, size: "" });
    setQty(1);
    setQty2(1);
  }, [router.query.slug]);

  useEffect(() => {
    //refreshSelectableGroup();
  }, [variationGroup, selectedVariant]);

  useEffect(() => {
    scrollHandler();
  }, [router.pathname]);

  useEffect(() => {
    setShowClear(
      selectedVariant.color || selectedVariant.size != "" ? true : false
    );
    setShowVariationPrice(
      selectedVariant.color && selectedVariant.size != "" ? true : false
    );
    let toggle = ref?.current?.querySelector(".variation-toggle");

    if (toggle) {
      if (
        selectedVariant.color &&
        selectedVariant.size != "" &&
        toggle.classList.contains("collapsed")
      ) {
        toggle.click();
      }

      if (
        !(selectedVariant.color && selectedVariant.size != "") &&
        !toggle.classList.contains("collapsed")
      ) {
        toggle.click();
      }
    }
  }, [selectedVariant]);

  function scrollHandler() {
    if (router.pathname.includes("/product/default")) {
      let stickyBar = ref?.current?.querySelector(".sticky-bar");
      if (
        stickyBar.classList.contains("d-none") &&
        ref.current.getBoundingClientRect().bottom < 0
      ) {
        stickyBar.classList.remove("d-none");
        return;
      }
      if (
        !stickyBar.classList.contains("d-none") &&
        ref.current.getBoundingClientRect().bottom > 0
      ) {
        stickyBar.classList.add("d-none");
      }
    }
  }

  function onWishlistClick(e) {
    e.preventDefault();
    if (!isInWishlist(props.wishlist, product)) {
      props.addToWishlist(product);
    } else {
      router.push("/pages/wishlist");
    }
  }

  // function refreshSelectableGroup () {
  //     let tempArray = [ ...variationGroup ];
  //     if ( selectedVariant.color ) {
  //         tempArray = variationGroup.reduce( ( acc, cur ) => {
  //             if ( selectedVariant.color !== cur.color ) {
  //                 return acc;
  //             }
  //             return [ ...acc, cur ];
  //         }, [] );
  //     }

  //     setSizeArray( tempArray.reduce( ( acc, cur ) => {
  //         if ( acc.findIndex( item => item.size == cur.size ) !== -1 )
  //             return acc;
  //         return [ ...acc, cur ];
  //     }, [] ) );

  //     tempArray = [ ...variationGroup ];
  //     if ( selectedVariant.size ) {
  //         tempArray = variationGroup.reduce( ( acc, cur ) => {
  //             if ( selectedVariant.size !== cur.size ) {
  //                 return acc;
  //             }
  //             return [ ...acc, cur ];
  //         }, [] );
  //     }

  //     setColorArray( product?.variants?.reduce( ( acc, cur ) => {
  //         if (
  //             tempArray.findIndex( item => item.color == cur.color ) == -1
  //         ) {
  //             return [
  //                 ...acc,
  //                 {
  //                     color: cur.color,
  //                     colorName: cur.color_name,
  //                     price: cur.price,
  //                     disabled: true
  //                 }
  //             ];
  //         }
  //         return [
  //             ...acc,
  //             {
  //                 color: cur.color,
  //                 colorName: cur.color_name,
  //                 price: cur.price,
  //                 disabled: false
  //             }
  //         ];
  //     }, [] ) );
  // }

  function selectColor(e, item) {
    e.preventDefault();
    if (item.color == selectedVariant.color) {
      setSelectedVariant({
        ...selectedVariant,
        color: null,
        colorName: null,
        price: item.price,
      });
    } else {
      setSelectedVariant({
        ...selectedVariant,
        color: item.color,
        colorName: item.colorName,
        price: item.price,
      });
    }
  }

  function selectSize(e) {
    if (e.target.value == "") {
      setSelectedVariant({ ...selectedVariant, size: "" });
    } else {
      setSelectedVariant({ ...selectedVariant, size: e.target.value });
    }
  }

  function onChangeQty(current) {
    setQty(current);
  }

  function onChangeQty2(current) {
    setQty2(current);
  }

  function clearSelection(e) {
    e.preventDefault();
    setSelectedVariant({
      ...selectedVariant,
      color: null,
      colorName: null,
      size: "",
    });
    //refreshSelectableGroup();
  }

  function onCartClick(e, index = 0) {
    e.preventDefault();
    if (!qty || qty === 0) {
      notifyError("Erreur de la quantité");
      return;
    }
    let find = props.cartlist.find(
      ({ id_prod }) => id_prod === product.id_prod
    );
    if (find) {
      if (Number(find.qty + qty) > find.qte) {
        notifyError("Stock insuffisant");
        return;
      }
    } else {
      if (Number(qty) > product.qte) {
        notifyError("Stock insuffisant");
        return;
      }
    }

    if (e.currentTarget.classList.contains("btn-disabled")) return;

    let newProduct = { ...product };
    if (product?.variants?.length > 0) {
      newProduct = {
        ...product,
        name:
          product.name_produit +
          " - " +
          selectedVariant.colorName +
          ", " +
          selectedVariant.size,
        price: selectedVariant.price,
      };
    }
    props.addToCart(newProduct, index == 0 ? qty : qty2);
  }

  if (!product) {
    return <div>samuel</div>;
  }

  return (
    <>
      <MetaDocument
        title={product?.name || product?.name_produit}
        description={product ? product?.description : ""}
      />
         {open && <LoginModal open={open} setOpen={setOpen} />}
      {product?.emplacementid ? (
        <div className="product-details">
          <h1 className="product-title">{product.name_produit}</h1>
          {
            <div className="product-price">
              <span className="new-price">{product.price?.toFixed(2)} $</span>
            </div>

            // minPrice == maxPrice ?
            //     <div className="product-price">${ minPrice.toFixed( 2 ) }</div>
            //     :
            //     product.variants.length == 0 ?
            //         <div className="product-price">
            //             <span className="new-price">${ minPrice.toFixed( 2 ) }</span>
            //             <span className="old-price">${ maxPrice.toFixed( 2 ) }</span>
            //         </div>
            //         :
            //         <div className="product-price">${ minPrice.toFixed( 2 ) }&ndash;${ maxPrice.toFixed( 2 ) }</div>
          }

          <div className="product-content">
            <p>
              {product.description.length > 200
                ? product.description.slice(0, 200) + "..."
                : product.description}
            </p>
          </div>
          {/* 
            {
                product.variants.length > 0 ?
                    <>
                        <div className="details-filter-row details-row-size">
                            <label>Color:</label>

                            <div className="product-nav product-nav-dots">
                                {
                                    colorArray.map( ( item, index ) => (
                                        <a
                                            href="#"
                                            className={ `${( item.color == selectedVariant.color ? 'active ' : '' ) + ( item.disabled ? 'disabled' : '' )}` }
                                            style={ { backgroundColor: item.color } }
                                            key={ index }
                                            onClick={ e => selectColor( e, item ) }
                                        ></a>
                                    ) )
                                }
                            </div>
                        </div>

                        <div className="details-filter-row details-row-size">
                            <label htmlFor="size">Size:</label>
                            <div className="select-custom">
                                <select
                                    name="size"
                                    className="form-control"
                                    value={ selectedVariant.size }
                                    onChange={ selectSize }
                                >
                                    <option value="">Select a size</option>
                                    {
                                        sizeArray.map( ( item, index ) => (
                                            <option
                                                value={ item.size }
                                                key={ index }
                                            >{ item.size }</option>
                                        ) )
                                    }
                                </select>
                            </div>

                            <ALink href="#" className="size-guide mr-4">
                                <i className="icon-th-list"></i>size guide
                            </ALink>
                            {
                                showClear ?
                                    <a href="#" onClick={ clearSelection }>clear</a>
                                    : ""
                            }
                        </div >
                        <SlideToggle collapsed={ true }>
                            { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                                <div>
                                    <button className={ `d-none variation-toggle ${toggleState.toLowerCase()}` } onClick={ onToggle }></button>
                                    <div ref={ setCollapsibleElement } style={ { overflow: 'hidden' } }>
                                        <div className="product-price">
                                            ${ selectedVariant.price ? selectedVariant.price.toFixed( 2 ) : 0 }
                                        </div>
                                    </div>
                                </div>
                            ) }
                        </SlideToggle>
                    </>
                    : ""
            } */}

          <div className="product-details-footer">
            <div className="product-cat w-100 text-truncate">
              <div className="row">
                <div className="col-12 col-lg-6 col-md-6">
                  <button
                  onClick={() => setShowPhone(!showPhone)}
                    href="#"
                    className="btn btn-primary w-100"
                    style={{ color: "#fff", padding: 10, borderRadius: 5, fontSize:12 }}
                  >
                    {showPhone ? product?.phone : "Contacter le propriétaire"}
                  </button>
                </div>
                <div className="col-12 col-lg-6 col-md-6">
                  <a
                    href={`https://wa.me/${product?.phone}/?text=Bonjour, je viens de voir ${product.name || product.name_produit} sur Nunua market, est-ce que je peux en savoir plus ?`}
                    target="_black"
                    className="btn w-100 d-flex mt-2 mt-lg-0 mt-md-0"
                    style={{
                      padding: 10,
                      color: "#44cef5",
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: "#44cef5",
                      
                    }}
                  >
                    <BsWhatsapp size={18} color="#44cef5" />
                    <span className="ml-2" style={{fontSize:12}}>Chatter avec le propriétaire</span>
                  </a>
                </div>
              </div>
              <div className="row mt-2">
                
                <div className="col-12 col-lg-12 col-md-12">
                  <ul class="list-group">
                    <li
                      class="list-group-item"
                      style={{
                        backgroundColor: "#44cef5",
                        fontWeight: "bold",
                        fontSize: 14,
                        textAlign: "center",
                        padding: 10,
                        color: "#fff",
                      }}
                    >
                      Conseils de sécurité
                    </li>
                    <li class="list-group-item w-100 text-wrap">N'envoyez aucun prépaiement</li>
                    <li class="list-group-item w-100 text-wrap">
                      Rencontrez le vendeur dans un lieu public sûr
                    </li>
                    <li class="list-group-item w-100 text-wrap">
                      Inspectez ce que vous allez acheter pour vous assurer que
                      c'est ce dont vous avez besoin
                    </li>
                    <li class="list-group-item w-100 text-wrap">
                      Vérifiez tous les documents et ne payez que si vous êtes
                      satisfait
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12 col-lg-12 col-md-12">
                  <button
                    onClick={handleOpenLogin}
                    className="btn btn-primary w-100"
                    style={{ color: "#fff", padding: 10, borderRadius: 5 }}
                  >
                    Publier une pareille annonce
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="sticky-bar d-none">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <figure className="product-media">
                                <ALink href={ `/product/default/${product.slug}` }>
                                    <img src={ process.env.NEXT_PUBLIC_ASSET_URI + product.sm_pictures[ 0 ].url } alt="product" width={ product.sm_pictures[ 0 ].width } height={ product.sm_pictures[ 0 ].height } />
                                </ALink>
                            </figure>
                            <h3 className="product-title">
                                <ALink href={ `/product/default/${product.slug}` }>{ product.name }</ALink>
                            </h3>
                        </div>
                        <div className="col-6 justify-content-end">
                            {
                                ( selectedVariant.color && selectedVariant.size != "" ) ?
                                    <div className="product-price">
                                        ${ selectedVariant.price ? selectedVariant.price.toFixed( 2 ) : 0 }
                                    </div>
                                    :
                                    product.stock == 0 ?
                                        <div className="product-price">
                                            <span className="out-price">${ product.price.toFixed( 2 ) }</span>
                                        </div>
                                        :
                                        minPrice == maxPrice ?
                                            <div className="product-price">${ minPrice.toFixed( 2 ) }</div>
                                            :
                                            product.variants.length == 0 ?
                                                <div className="product-price">
                                                    <span className="new-price">${ minPrice.toFixed( 2 ) }</span>
                                                    <span className="old-price">${ maxPrice.toFixed( 2 ) }</span>
                                                </div>
                                                :
                                                <div className="product-price">${ minPrice.toFixed( 2 ) }&ndash;${ maxPrice.toFixed( 2 ) }</div>
                            }
                            <Qty changeQty={ onChangeQty2 } max={ product.stock } value={ qty2 }></Qty>
                            <div className="product-details-action">
                                <a
                                    href="#"
                                    className={ `btn-product btn-cart ${( !canAddToCart( props.cartlist, product, qty ) || ( product.variants.length > 0 && !showVariationPrice ) ) ? 'btn-disabled' : ''}` }
                                    onClick={ e => onCartClick( e, 1 ) }
                                >
                                    <span>add to cart</span>
                                </a>
                                {
                                    isInWishlist( props.wishlist, product ) ?
                                        <ALink href="/shop/wishlist" className="btn-product btn-wishlist added-to-wishlist"><span>Go to Wishlist</span></ALink>
                                        :
                                        <a href="#" className="btn-product btn-wishlist" onClick={ onWishlistClick }><span>Add to Wishlist</span></a>

                                }
                            </div >
                        </div >
                    </div >
                </div >
            </div > */}
        </div>
      ) : (
        <div className="product-details">
          <h1 className="product-title">{product.name_produit}</h1>

          <div className="ratings-container">
            <div className="ratings">
              <div
                className="ratings-val"
                style={{ width: product.ratings * 20 + "%" }}
              ></div>
              {/* <span className="tooltip-text">{ product.ratings.toFixed( 2 ) }</span> */}
            </div>
            {/* <span className="ratings-text">( { product.review } Reviews )</span> */}
          </div>

          {
            product.qte <= 0 ? (
              <div className="product-price">
                <span className="out-price">
                  {/* {
                                 minPrice == maxPrice ?
                                     <span>${ product.price_red.toFixed( 2 ) }</span>
                                     :
                                     <span>${ minPrice.toFixed( 2 ) }&ndash;${ maxPrice.toFixed( 2 ) }</span>
                             } */}
                  <span>{product.price_red}$</span>
                </span>
              </div>
            ) : product.price > product.price_red ? (
              <>
                <span className="new-price">
                  {product.price_red?.toFixed(2)} $
                </span>
                <span className="line">{product.price?.toFixed(2)} $</span>
              </>
            ) : (
              <span className="new-price">{product.price?.toFixed(2)} $</span>
            )
            // minPrice == maxPrice ?
            //     <div className="product-price">${ minPrice.toFixed( 2 ) }</div>
            //     :
            //     product.variants.length == 0 ?
            //         <div className="product-price">
            //             <span className="new-price">${ minPrice.toFixed( 2 ) }</span>
            //             <span className="old-price">${ maxPrice.toFixed( 2 ) }</span>
            //         </div>
            //         :
            //         <div className="product-price">${ minPrice.toFixed( 2 ) }&ndash;${ maxPrice.toFixed( 2 ) }</div>
          }

          <div className="product-content">
            <p>
              {product?.description?.length > 200
                ? product?.description?.slice(0, 200) + "..."
                : product.description}
            </p>
          </div>
          {/* 
             {
                 product.variants.length > 0 ?
                     <>
                         <div className="details-filter-row details-row-size">
                             <label>Color:</label>
 
                             <div className="product-nav product-nav-dots">
                                 {
                                     colorArray.map( ( item, index ) => (
                                         <a
                                             href="#"
                                             className={ `${( item.color == selectedVariant.color ? 'active ' : '' ) + ( item.disabled ? 'disabled' : '' )}` }
                                             style={ { backgroundColor: item.color } }
                                             key={ index }
                                             onClick={ e => selectColor( e, item ) }
                                         ></a>
                                     ) )
                                 }
                             </div>
                         </div>
 
                         <div className="details-filter-row details-row-size">
                             <label htmlFor="size">Size:</label>
                             <div className="select-custom">
                                 <select
                                     name="size"
                                     className="form-control"
                                     value={ selectedVariant.size }
                                     onChange={ selectSize }
                                 >
                                     <option value="">Select a size</option>
                                     {
                                         sizeArray.map( ( item, index ) => (
                                             <option
                                                 value={ item.size }
                                                 key={ index }
                                             >{ item.size }</option>
                                         ) )
                                     }
                                 </select>
                             </div>
 
                             <ALink href="#" className="size-guide mr-4">
                                 <i className="icon-th-list"></i>size guide
                             </ALink>
                             {
                                 showClear ?
                                     <a href="#" onClick={ clearSelection }>clear</a>
                                     : ""
                             }
                         </div >
                         <SlideToggle collapsed={ true }>
                             { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                                 <div>
                                     <button className={ `d-none variation-toggle ${toggleState.toLowerCase()}` } onClick={ onToggle }></button>
                                     <div ref={ setCollapsibleElement } style={ { overflow: 'hidden' } }>
                                         <div className="product-price">
                                             ${ selectedVariant.price ? selectedVariant.price.toFixed( 2 ) : 0 }
                                         </div>
                                     </div>
                                 </div>
                             ) }
                         </SlideToggle>
                     </>
                     : ""
             } */}

          <div className="details-filter-row details-row-size">
            <label htmlFor="qty">Quantité:</label>
            <Qty changeQty={onChangeQty} max={product.qte} value={qty}></Qty>
          </div>
          {product.qte > 0 ? (
            <div className="product-details-action">
              <a
                href="#"
                style={{ borderRadius: 30 }}
                className={`btn-product btn-cart mr-2 ${
                  !canAddToCart(props.cartlist, product, qty) ||
                  (product?.variants?.length > 0 && !showVariationPrice)
                    ? "btn-disabled"
                    : ""
                }`}
                onClick={(e) => onCartClick(e, 0)}
              >
                <span>Ajouter au panier</span>
              </a>
              <a
                href="#"
                style={{ borderRadius: 30 }}
                className={`btn-product btn-cart ${
                  !canAddToCart(props.cartlist, product, qty) ||
                  (product?.variants?.length > 0 && !showVariationPrice)
                    ? "btn-disabled"
                    : ""
                }`}
                onClick={(e) => onCartClick(e, 0)}
              >
                <span>Acheter</span>
              </a>
              <div className="details-action-wrapper">
                {/* {isInWishlist(props.wishlist, product) ? (
               <ALink
                 href="/user/wishlist"
                 className="btn-product btn-wishlist added-to-wishlist"
               >
                 <span>Mes favoris</span>
               </ALink>
             ) : (
               <a
                 href="#"
                 className="btn-product btn-wishlist"
                 onClick={onWishlistClick}
               >
                 <span>Ajouter aux favoris</span>
               </a>
             )} */}
              </div>
            </div>
          ) : null}

          <div className="product-details-footer">
            <div className="product-cat w-100 text-truncate">
              <span>Category: {product?.name_sous}</span>
              {/* {
                         product.category.map( ( cat, index ) => (
                             <span key={ index }>
                                 <ALink
                                     href={ { pathname: '/shop/sidebar/list', query: { category: cat.slug } } }
                                 >{ cat.name }</ALink>
                                 { index < product.category.length - 1 ? ',' : '' }
                             </span>
                         ) )
                     } */}
            </div>

            <div className="social-icons social-icons-sm">
              <span className="social-label">Share:</span>
              <ALink href="#" className="social-icon" title="Facebook">
                <i className="icon-facebook-f"></i>
              </ALink>
              <ALink href="#" className="social-icon" title="Twitter">
                <i className="icon-twitter"></i>
              </ALink>
              <ALink href="#" className="social-icon" title="Instagram">
                <i className="icon-instagram"></i>
              </ALink>
              <ALink href="#" className="social-icon" title="Pinterest">
                <i className="icon-pinterest"></i>
              </ALink>
            </div>
          </div>
          {/* <div className="sticky-bar d-none">
                 <div className="container">
                     <div className="row">
                         <div className="col-6">
                             <figure className="product-media">
                                 <ALink href={ `/product/default/${product.slug}` }>
                                     <img src={ process.env.NEXT_PUBLIC_ASSET_URI + product.sm_pictures[ 0 ].url } alt="product" width={ product.sm_pictures[ 0 ].width } height={ product.sm_pictures[ 0 ].height } />
                                 </ALink>
                             </figure>
                             <h3 className="product-title">
                                 <ALink href={ `/product/default/${product.slug}` }>{ product.name }</ALink>
                             </h3>
                         </div>
                         <div className="col-6 justify-content-end">
                             {
                                 ( selectedVariant.color && selectedVariant.size != "" ) ?
                                     <div className="product-price">
                                         ${ selectedVariant.price ? selectedVariant.price.toFixed( 2 ) : 0 }
                                     </div>
                                     :
                                     product.stock == 0 ?
                                         <div className="product-price">
                                             <span className="out-price">${ product.price.toFixed( 2 ) }</span>
                                         </div>
                                         :
                                         minPrice == maxPrice ?
                                             <div className="product-price">${ minPrice.toFixed( 2 ) }</div>
                                             :
                                             product.variants.length == 0 ?
                                                 <div className="product-price">
                                                     <span className="new-price">${ minPrice.toFixed( 2 ) }</span>
                                                     <span className="old-price">${ maxPrice.toFixed( 2 ) }</span>
                                                 </div>
                                                 :
                                                 <div className="product-price">${ minPrice.toFixed( 2 ) }&ndash;${ maxPrice.toFixed( 2 ) }</div>
                             }
                             <Qty changeQty={ onChangeQty2 } max={ product.stock } value={ qty2 }></Qty>
                             <div className="product-details-action">
                                 <a
                                     href="#"
                                     className={ `btn-product btn-cart ${( !canAddToCart( props.cartlist, product, qty ) || ( product.variants.length > 0 && !showVariationPrice ) ) ? 'btn-disabled' : ''}` }
                                     onClick={ e => onCartClick( e, 1 ) }
                                 >
                                     <span>add to cart</span>
                                 </a>
                                 {
                                     isInWishlist( props.wishlist, product ) ?
                                         <ALink href="/shop/wishlist" className="btn-product btn-wishlist added-to-wishlist"><span>Go to Wishlist</span></ALink>
                                         :
                                         <a href="#" className="btn-product btn-wishlist" onClick={ onWishlistClick }><span>Add to Wishlist</span></a>
 
                                 }
                             </div >
                         </div >
                     </div >
                 </div >
             </div > */}
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cartlist: state.cartlist.data,
    wishlist: state.wishlist.data,
  };
};

export default connect(mapStateToProps, { ...wishlistAction, ...cartAction })(
  DetailOne
);
