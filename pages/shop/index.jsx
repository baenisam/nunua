import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import {IoFilterSharp} from 'react-icons/io'
import StickyBox from "react-sticky-box";

import ALink from "~/components/features/alink";
import ShopListOne from "~/components/partials/shop/list/shop-list-one";
import useAsync from "~/Hooks/useAsync";
import Pagination from "~/components/features/pagination";
import ShopSidebarOne from "~/components/partials/shop/sidebar/shop-sidebar-one";
import MarqueServices from "~/services/MarqueServices";
import MetaDocument from "~/components/Meta";
import CathegorieService from "~/services/CategorieServices";
import ErrorPage from "pages/404";
import ProductServices from "~/services/ProductServices";

import withApollo from "~/server/apollo";

import { scrollToPageContent } from "~/utils";

function ShopGrid() {
  const router = useRouter();
  const query = router.query;
  const { data, loading, error } = useAsync(
    () =>
      ProductServices.byCategory(
        query.category ? query.category : null,
        query.query ? query.query : null
      ),
    query
  );
  const { data: marques } = useAsync(MarqueServices.allMarque);
  const { data: categorie } = useAsync(CathegorieService.getcategorie);
  const products = data?.produits;
  const totalCount = products?.length;

  const [firstLoading, setFirstLoading] = useState(false);
  const [perPage, setPerPage] = useState(12);
  const [pageTitle, setPageTitle] = useState(products?.name_produit);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", resizeHandle);
    resizeHandle();
    return () => {
      window.removeEventListener("resize", resizeHandle);
    };
  }, []);

  function resizeHandle() {
    if (document.querySelector("body").offsetWidth < 992) setToggle(true);
    else setToggle(false);
  }

  useEffect(() => {
    scrollToPageContent();
  }, [query, perPage]);

  useEffect(() => {
    if (products) setFirstLoading(true);
  }, [products]);

  //   useEffect(() => {
  //     if (type == "list") {
  //       setPageTitle("List");
  //       setPerPage(5);
  //     } else if (type == "2cols") {
  //       setPageTitle("Grid 2 Columns");
  //       setPerPage(6);
  //     } else if (type == "3cols") {
  //       setPageTitle("Grid 3 Columns");
  //       setPerPage(9);
  //     } else if (type == "4cols") {
  //       setPageTitle("Grid 4 Columns");
  //       setPerPage(12);
  //     }
  //   }, [type]);

  function onSortByChange(e) {
    let queryObject = router.query;
    let url = router.pathname.replace("[type]", query.type) + "?";
    for (let key in queryObject) {
      if (key !== "type" && key !== "sortBy") {
        url += key + "=" + queryObject[key] + "&";
      }
    }

    router.push(url + "sortBy=" + e.target.value);
  }

  function toggleSidebar() {
    if (
      document.querySelector("body").classList.contains("sidebar-filter-active")
    ) {
      document.querySelector("body").classList.remove("sidebar-filter-active");
    } else {
      document.querySelector("body").classList.add("sidebar-filter-active");
    }
  }

  function hideSidebar() {
    document.querySelector("body").classList.remove("sidebar-filter-active");
  }

  if (error) {
    return <ErrorPage />;
  }



  return (
    <main className="main shop">
      <MetaDocument title={query.query ? "Recherche" : "Shopping"} />
      <nav className="breadcrumb-nav mb-2">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Accueil</ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href="#">Shop</ALink>
            </li>
            {query.search ? (
              <li className="breadcrumb-item active">
                <span>Recherche - {query.searchTerm}</span>
              </li>
            ) : (
              <li className="breadcrumb-item active">
                <span>{data?.categorie?.name}</span>
              </li>
            )}
          </ol>
        </div>
      </nav>

      <div className="page-content">
        <div className="container">
          <div className="row skeleton-body">
            <div
              className={`col-lg-9 skel-shop-products ${
                !loading ? "loaded" : ""
              }`}
            >
              <div className="toolbox">
                <div className="toolbox-left">
                  {/* {
                                        !loading && products ?
                                            <div className="toolbox-info">
                                                Showing
                                                <span> { products.length } of { totalCount }</span> Products
                                            </div>
                                            : ""
                                    } */}
                </div>

                <div className="toolbox-right">
                  {/*
                  <div className="toolbox-sort">
                    <label htmlFor="sortby">Sort by:</label>
                    <div className="select-custom">
                      <select
                        name="sortby"
                        id="sortby"
                        className="form-control"
                        onChange={onSortByChange}
                        value={query.sortBy ? query.sortBy : "default"}
                      >
                        <option value="default">Default</option>
                        <option value="featured">Most Popular</option>
                        <option value="rating">Most Rated</option>
                        <option value="new">Date</option>
                      </select>
                    </div>
                  </div>
                   <div className="toolbox-layout">
                    <ALink
                      href="/shop/sidebar/list"
                      className={`btn-layout ${type == "list" ? "active" : ""}`}
                      scroll={false}
                    >
                      <svg width="16" height="10">
                        <rect x="0" y="0" width="4" height="4" />
                        <rect x="6" y="0" width="10" height="4" />
                        <rect x="0" y="6" width="4" height="4" />
                        <rect x="6" y="6" width="10" height="4" />
                      </svg>
                    </ALink>

                    <ALink
                      href="/shop/sidebar/2cols"
                      className={`btn-layout ${
                        type == "2cols" ? "active" : ""
                      }`}
                      scroll={false}
                    >
                      <svg width="10" height="10">
                        <rect x="0" y="0" width="4" height="4" />
                        <rect x="6" y="0" width="4" height="4" />
                        <rect x="0" y="6" width="4" height="4" />
                        <rect x="6" y="6" width="4" height="4" />
                      </svg>
                    </ALink>

                    <ALink
                      href="/shop/sidebar/3cols"
                      className={`btn-layout ${
                        type == "3cols" ? "active" : ""
                      }`}
                      scroll={false}
                    >
                      <svg width="16" height="10">
                        <rect x="0" y="0" width="4" height="4" />
                        <rect x="6" y="0" width="4" height="4" />
                        <rect x="12" y="0" width="4" height="4" />
                        <rect x="0" y="6" width="4" height="4" />
                        <rect x="6" y="6" width="4" height="4" />
                        <rect x="12" y="6" width="4" height="4" />
                      </svg>
                    </ALink>

                    <ALink
                      href="/shop/sidebar/4cols"
                      className={`btn-layout ${
                        type == "4cols" ? "active" : ""
                      }`}
                      scroll={false}
                    >
                      <svg width="22" height="10">
                        <rect x="0" y="0" width="4" height="4" />
                        <rect x="6" y="0" width="4" height="4" />
                        <rect x="12" y="0" width="4" height="4" />
                        <rect x="18" y="0" width="4" height="4" />
                        <rect x="0" y="6" width="4" height="4" />
                        <rect x="6" y="6" width="4" height="4" />
                        <rect x="12" y="6" width="4" height="4" />
                        <rect x="18" y="6" width="4" height="4" />
                      </svg>
                    </ALink>
                  </div> */}
                </div>
              </div>

              <ShopListOne
                products={products}
                perPage={perPage}
                loading={loading}
              ></ShopListOne>

              {totalCount > perPage ? (
                <Pagination perPage={perPage} total={totalCount}></Pagination>
              ) : (
                ""
              )}
            </div>

            <aside
              className={`col-lg-3 skel-shop-sidebar order-lg-first skeleton-body ${
                !loading || firstLoading ? "loaded" : ""
              }`}
            >
              <div className="skel-widget"></div>
              <div className="skel-widget"></div>
              <div className="skel-widget"></div>
              <div className="skel-widget"></div>
              <StickyBox className="sticky-content" offsetTop={70}>
                <ShopSidebarOne
                  marques={marques}
                  categorie={categorie}
                  toggle={toggle}
                ></ShopSidebarOne>
              </StickyBox>
              {toggle ? (
                <button
                  className="sidebar-fixed-toggler bg-white"
                  onClick={toggleSidebar}
                >
                  <i className="icon-cog text-primary"></i>
                </button>
              ) : (
                ""
              )}
              <div
                className="sidebar-filter-overlay"
                onClick={hideSidebar}
              ></div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

export default withApollo({ ssr: typeof window == "undefined" })(ShopGrid);
