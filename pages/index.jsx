import { useQuery } from "@apollo/react-hooks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Reveal from "react-awesome-reveal";

import ALink from "~/components/features/alink";
import OwlCarousel from "~/components/features/owl-carousel";
import DealCollection from "~/components/partials/home/deal-collection";
import ElectronicsCollection from "~/components/partials/home/electronics-collection";
import FurnitureCollection from "~/components/partials/home/furniture-collection";
import ClothingCollection from "~/components/partials/home/clothing-collection";
import useAsync from "~/Hooks/useAsync";
import MarqueServices from "~/services/MarqueServices";
import CathegorieService from "~/services/CategorieServices";
import ProductServices from "~/services/ProductServices";
import BlogCollection from "~/components/partials/home/blog-collection";
import MetaDocument from "~/components/Meta";
import NewsletterModal from "~/components/features/modals/newsletter-modal";
import DealAnnonce from "~/components/partials/home/deal-annonce";

import withApollo from "~/server/apollo";
import { GET_HOME_DATA } from "~/server/queries";
import { attrFilter } from "~/utils";

import {
  homeData,
  introSlider,
  brandSlider,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  fadeInRightShorter,
  fadeInLeftShorter,
  fadeInUpShorter,
  fadeIn,
} from "~/utils/data";

function Home() {
  const { data: brands } = useAsync(() => MarqueServices.allMarque());
  const { data: products, loading } = useAsync(() =>
    ProductServices.getProducts()
  );
  const { data: annonces, loading:loadingProduit } = useAsync(() =>
    ProductServices.getAnnonces()
  );
  const { data, loading: loadingTop } = useAsync(() =>
    ProductServices.getTopSellers()
  );
  const { data: categories } = useAsync(() => CathegorieService.getFeatured());
  const { data: allCategories } = useAsync(() =>
    CathegorieService.getcategorie()
  );
  // const { data, loading, error } = useQuery( GET_HOME_DATA );
  // const products = data && data.homeData.products;
  // const bestProducts = attrFilter( data && data.homeData.products, 'rated' );
  // const featuredProducts = attrFilter( data && data.homeData.products, 'featured' );
  // const dealProducts = attrFilter( data && data.homeData.products, 'until' );
  // const electronicsProducts = catFilter( data && data.homeData.products, [ 'electronics' ] );
  // const furnitureProducts = catFilter( data && data.homeData.products, [ 'furniture' ] );
  // const clothingProducts = catFilter( data && data.homeData.products, [ 'clothing' ] );
  // const cookingProducts = catFilter( data && data.homeData.products, [ 'cooking' ] );
  // const posts = data && data.homeData.posts;
  const topSellers = data[0]?.data;
  const discountProduct = data[1]?.data;

  // if ( error ) {
  //     return <div></div>
  // }

  return (
    <div className="main home-page skeleton-body">
      <MetaDocument title="Accueil" />
      <div className="intro-slider-container">
        <OwlCarousel adClass="owl-simple intro-slider" options={introSlider}>
          <div
            className="intro-slide"
            style={{
              backgroundColor: "#EDF2F0",
              backgroundImage: "url(images/home/sliders/slide-1.png)",
            }}
          >
            <div className="container intro-content">
              <Reveal keyframes={fadeInUpShorter} delay={100} duration={1000}>
                <div className="row">
                  <div className="col-auto offset-lg-3 intro-col">
                    <h3 className="intro-subtitle">Technologie</h3>

                    <h1 className="intro-title">
                      Gérez votre stock et
                      <br />
                      inventaire avec Le logiciel
                      <span>
                        <span className="text-primary">
                          &nbsp;KAZISAFE&nbsp;
                        </span>
                      </span>
                    </h1>
                    <ALink
                    target="_blank"
                      href="https://kazisafe.com"
                      className="btn btn-outline-primary-2 btn-rounded"
                    >
                      <span>Commencer</span>
                      <i className="icon-long-arrow-right"></i>
                    </ALink>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
          {/* <div
            className="intro-slide"
            style={{ backgroundImage: "url(images/home/sliders/slide-2.jpg)" }}
          >
            <div className="container intro-content">
              <Reveal keyframes={fadeInUpShorter} delay={100} duration={1000}>
                <div className="row">
                  <div className="col-auto offset-lg-3 intro-col">
                    <h3 className="intro-subtitle">Trevel & Outdoor</h3>

                    <h1 className="intro-title">
                      Original Outdoor
                      <br />
                      Beanbag
                      <span>
                        <sup className="font-weight-light line-through">
                          $89,99
                        </sup>
                        <span className="text-primary">
                          &nbsp;$29&nbsp;
                          <sup>,99</sup>
                        </span>
                      </span>
                    </h1>
                    <ALink
                      href="/"
                      className="btn btn-outline-primary-2"
                    >
                      <span>Shop Now</span>
                      <i className="icon-long-arrow-right"></i>
                    </ALink>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div
            className="intro-slide"
            style={{
              backgroundColor: "#EDF2F0",
              backgroundImage: "url(images/home/sliders/slide-3.jpg)",
            }}
          >
            <div className="container intro-content">
              <Reveal keyframes={fadeInUpShorter} delay={100} duration={1000}>
                <div className="row">
                  <div className="col-auto offset-lg-3 intro-col">
                    <h3 className="intro-subtitle">Fashion Promotions</h3>

                    <h1 className="intro-title">
                      Tan Suede
                      <br />
                      Biker Jacket
                      <span>
                        <sup className="font-weight-light line-through">
                          $240,00
                        </sup>
                        <span className="text-primary">
                          &nbsp;$180&nbsp;
                          <sup>,99</sup>
                        </span>
                      </span>
                    </h1>
                    <ALink
                      href="/"
                      className="btn btn-outline-primary-2"
                    >
                      <span>Shop Now</span>
                      <i className="icon-long-arrow-right"></i>
                    </ALink>
                  </div>
                </div>
              </Reveal>
            </div>
          </div> */}
        </OwlCarousel>
      </div>

      <div className="mb-4"></div>

      {/* <Reveal keyframes={fadeIn} delay={200} duration={500} triggerOnce>
        <div className="container">
          <h2 className="title text-center mb-2">Explorer les catégories populaires</h2>

          <div className="cat-blocks-container">
            <div className="row">
              {allCategories?.slice(0, 6).map((item) => (
                <div className="col-6 col-sm-4 col-lg-2">
                  <ALink
                    href={{
                        pathname: "/shop",
                        query: { category: item.id },
                      }}
                    className="cat-block"
                  >
                    <figure>
                      <span>
                        <div className="lazy-overlay bg-transparent"></div>

                        <LazyLoadImage
                          alt="Category"
                          src={
                            process.env.NEXT_PUBLIC_ASSET_URL +
                            "category/" +
                            item.image
                          }
                          style={{width:100}}
                          threshold={200}
                          width="100"
                          height="70"
                          effect="blur"
                        />
                      </span>
                    </figure>

                    <h3 className="cat-block-title">{item.name}</h3>
                  </ALink>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal> */}

      <div className="mb-2"></div>

      {/* <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6 col-lg-3">
            <Reveal
              keyframes={fadeInLeftShorter}
              delay={200}
              duration={500}
              triggerOnce
            >
              <div className="banner banner-1 banner-overlay">
                <ALink href="/shop/sidebar/3cols" className="lazy-media">
                  <div className="lazy-overlay"></div>

                  <LazyLoadImage
                    alt="Banner"
                    src="images/home/banners/banner-1.jpg"
                    threshold={200}
                    width="277"
                    height="260"
                    effect="blur"
                  />
                </ALink>

                <div className="banner-content">
                  <h4 className="banner-subtitle text-white">
                    <a href="#">Weekend Sale</a>
                  </h4>

                  <h3 className="banner-title text-white">
                    <a href="#">
                      Lighting
                      <br />& Accessories
                      <br />
                      <span>25% off</span>
                    </a>
                  </h3>

                  <ALink href="/shop/sidebar/3cols" className="banner-link">
                    Shop Now&nbsp;
                    <i className="icon-long-arrow-right"></i>
                  </ALink>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="col-sm-6 col-lg-3 order-lg-last">
            <Reveal
              keyframes={fadeInRightShorter}
              delay={200}
              duration={500}
              triggerOnce
            >
              <div className="banner banner-3 banner-overlay">
                <ALink href="/shop/sidebar/list" className="lazy-media">
                  <div className="lazy-overlay"></div>

                  <LazyLoadImage
                    alt="Banner"
                    src="images/home/banners/banner-3.jpg"
                    threshold={200}
                    width="576"
                    height="260"
                    effect="blur"
                  />
                </ALink>

                <div className="banner-content">
                  <h4 className="banner-subtitle text-white">
                    <a href="#">Smart Offer</a>
                  </h4>

                  <h3 className="banner-title text-white">
                    <a href="#">
                      Anniversary
                      <br />
                      Special
                      <br />
                      <span>15% off</span>
                    </a>
                  </h3>

                  <ALink href="/shop/sidebar/list" className="banner-link">
                    Shop Now&nbsp;
                    <i className="icon-long-arrow-right"></i>
                  </ALink>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="col-lg-6">
            <Reveal keyframes={fadeInUp} delay={200} duration={500} triggerOnce>
              <div className="banner banner-2 banner-overlay">
                <ALink href="/shop/sidebar/list" className="lazy-media">
                  <div className="lazy-overlay"></div>

                  <LazyLoadImage
                    alt="Banner"
                    src="images/home/banners/banner-2.jpg"
                    threshold={200}
                    width="277"
                    height="260"
                    effect="blur"
                  />
                </ALink>

                <div className="banner-content">
                  <h4 className="banner-subtitle text-white d-none d-sm-block">
                    <a href="#">Amazing Value</a>
                  </h4>

                  <h3 className="banner-title text-white">
                    <a href="#">
                      Clothes Trending
                      <br />
                      Spring Collection 2021
                      <br />
                      <span>from $12,99</span>
                    </a>
                  </h3>

                  <ALink href="/shop/sidebar/3cols" className="banner-link">
                    Discover Now&nbsp;
                    <i className="icon-long-arrow-right"></i>
                  </ALink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div> */}

      <div className="mb-3"></div>

      {/* <div className="bg-light pt-3 pb-5">
        <Reveal
          keyframes={fadeInUpShorter}
          delay={150}
          duration={500}
          triggerOnce
        >
          <DealCollection
            categories={categories}
            products={products}
            loading={loading}
          />
        </Reveal>
      </div> */}
      <div className="bg-light pt-3 pb-5">
        <Reveal
          keyframes={fadeInUpShorter}
          delay={150}
          duration={500}
          triggerOnce
        >
          <DealAnnonce
            categories={categories}
            products={annonces}
            loading={loadingProduit}
          />
        </Reveal>
      </div>

      <div className="mb-3"></div>

      {/* <Reveal
        keyframes={fadeInUpShorter}
        delay={150}
        duration={500}
        triggerOnce
      >
        <ElectronicsCollection products={ products } loading={ loading } />
      </Reveal> */}

      <div className="mb-3"></div>
{/* 
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <Reveal
              keyframes={fadeInLeftShorter}
              delay={200}
              duration={500}
              triggerOnce
            >
              <div className="banner banner-4 banner-overlay banner-overlay-light">
                <ALink href="/shop/sidebar/3cols" className="lazy-media">
                  <div className="lazy-overlay"></div>

                  <LazyLoadImage
                    alt="Banner"
                    src="images/home/banners/banner-4.jpg"
                    threshold={200}
                    width="575"
                    height="260"
                    effect="blur"
                  />
                </ALink>
                <div className="banner-content">
                  <h4 className="banner-subtitle">
                    <ALink href="/shop/sidebar/3cols">
                      Spring Sale is Coming
                    </ALink>
                  </h4>

                  <h3 className="banner-title">
                    <ALink href="/shop/sidebar/3cols">
                      All Smart Watches
                      <br />
                      Discount
                      <br />
                      <span className="text-primary">15% off</span>
                    </ALink>
                  </h3>

                  <ALink
                    href="/shop/sidebar/list"
                    className="banner-link banner-link-dark"
                  >
                    Discover Now
                    <i className="icon-long-arrow-right"></i>
                  </ALink>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="col-lg-6">
            <Reveal
              keyframes={fadeInRightShorter}
              delay={200}
              duration={500}
              triggerOnce
            >
              <div className="banner banner-5 banner-overlay">
                <ALink href="/shop/sidebar/3cols" className="lazy-media">
                  <div className="lazy-overlay"></div>

                  <LazyLoadImage
                    alt="Banner"
                    src="images/home/banners/banner-5.png"
                    threshold={200}
                    width="575"
                    height="260"
                    effect="blur"
                  />
                </ALink>
                <div className="banner-content">
                  <h4 className="banner-subtitle text-white">
                    <ALink href="/shop/sidebar/4cols">Amazing Value</ALink>
                  </h4>

                  <h3 className="banner-title text-white">
                    <ALink href="/shop/sidebar/4cols">
                      Headphones Trending
                      <br />
                      JBL Harman
                      <br />
                      <span>from $59,99</span>
                    </ALink>
                  </h3>

                  <ALink href="/shop/sidebar/list" className="banner-link">
                    Discover Now
                    <i className="icon-long-arrow-right"></i>
                  </ALink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div> */}

      <div className="mb-1"></div>

      {/* <Reveal
        keyframes={fadeInUpShorter}
        delay={150}
        duration={500}
        triggerOnce
      >
        <FurnitureCollection products={ products } loading={ loading } />
      </Reveal> */}

      <div className="mb-3"></div>

      {/* <Reveal
        keyframes={fadeInUpShorter}
        delay={150}
        duration={500}
        triggerOnce
      >
        <ClothingCollection products={ products } loading={ loading } />
      </Reveal> */}

      <div className="mb-3"></div>

      {/* <div className="container">
        <h2 className="title title-border mb-3">Shop by Brands</h2>

        <Reveal keyframes={fadeIn} delay={150} duration={500} triggerOnce>
          <OwlCarousel
            adClass="brands-border owl-simple brand-slider mb-3"
            options={brandSlider}
          >
            {
                            homeData.brands.map( ( brand, index ) => {
                                return (
                                    <ALink href="#" className="brand mr-0" key={ index } >
                                        <img src={ brand.image } alt="brand" width={ brand.width } height={ brand.height } />
                                    </ALink>
                                )
                            } )
                        }
          </OwlCarousel>
        </Reveal>
      </div> */}

      {/* <Reveal
        keyframes={fadeInUpShorter}
        delay={200}
        duration={1000}
        triggerOnce
      >
        <BlogCollection posts={ posts } loading={ loading }></BlogCollection>
      </Reveal> */}

      {/* <Reveal keyframes={fadeIn} delay={200} duration={1000} triggerOnce>
        <div className="icon-boxes-container bg-white">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-lg-3">
                <div className="icon-box icon-box-side">
                  <span className="icon-box-icon">
                    <i className="icon-rocket"></i>
                  </span>
                  <div className="icon-box-content">
                    <h3 className="icon-box-title">Free Shipping</h3>

                    <p>Orders $50 or more</p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-3">
                <div className="icon-box icon-box-side">
                  <span className="icon-box-icon">
                    <i className="icon-rotate-left"></i>
                  </span>

                  <div className="icon-box-content">
                    <h3 className="icon-box-title">Free Returns</h3>

                    <p>Within 30 days</p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-3">
                <div className="icon-box icon-box-side">
                  <span className="icon-box-icon">
                    <i className="icon-info-circle"></i>
                  </span>

                  <div className="icon-box-content">
                    <h3 className="icon-box-title">Get 20% Off 1 Item</h3>

                    <p>When you sign up</p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-3">
                <div className="icon-box icon-box-side">
                  <span className="icon-box-icon">
                    <i className="icon-life-ring"></i>
                  </span>

                  <div className="icon-box-content">
                    <h3 className="icon-box-title">We Support</h3>

                    <p>24/7 amazing services</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal> */}
      {/* <NewsletterModal /> */}
    </div>
  );
}

export default withApollo({ ssr: typeof window == "undefined" })(Home);
