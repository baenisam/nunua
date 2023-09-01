import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";

import ALink from "~/components/features/alink";
import LoginModal from "~/components/features/modals/login-modal";
import HeaderSearch from "~/components/partials/header/partials/header-search";
import GlobalContext from "~/context/GlobalContext";
import WishlistMenu from "~/components/partials/header/partials/wishlist-menu";
import CartMenu from "~/components/partials/header/partials/cart-menu";
import CathegorieService from "~/services/CategorieServices";
import useAsync from "~/Hooks/useAsync";
import CategoryMenu from "~/components/partials/header/partials/category-menu";
import MainMenu from "~/components/partials/header/partials/main-menu";
import StickyHeader from "~/components/features/sticky-header";
import { UserContext } from "~/context/UserContext";
import CompareMenu from "./partials/compare-menu";

function Header({ data }) {
  const router = useRouter();
  const [containerClass, setContainerClass] = useState("container");

  const { show, open, setOpen, setRedirection } = useContext(GlobalContext);
  const { data: category, loading: loadingCategory } = useAsync(
    CathegorieService.getcategorie
  );

  const {
    dispatch,
    state: { userInfo },
  } = useContext(UserContext);

  function openMobileMenu() {
    document.querySelector("body").classList.add("mmenu-active");
  }

  useEffect(() => {
    setContainerClass(
      router.asPath.includes("fullwidth") ? "container-fluid" : "container"
    );
  }, [router.asPath]);

  const navigate = () => {
    if (userInfo?.token) {
      router.push("/user/create-add");
    } else {
      setRedirection("/user/create-add");
      setOpen(true);
    }
  };

  return (
    <header className="header header-10 header-intro-clearance">
      {/* <div className="header-top mt-2">
        <div className={containerClass}>
          <div className="header-left">
            <a href="tel:#">
              <i className="icon-phone"></i> +243 999 999 999
            </a>
          </div>

          <div className="header-right">
            <ul className="top-menu">
              <li>
                <ALink href="#">Links</ALink>
                <ul>
                  <li>
                    <div className="header-dropdown">
                      <ALink href="#">USD</ALink>
                      <div className="header-menu">
                        <ul>
                          <li>
                            <ALink href="#">Eur</ALink>
                          </li>
                          <li>
                            <ALink href="#">Usd</ALink>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    {userInfo?.token ? (
                      <ALink href="/seller/account">Vendre sur Nunua</ALink>
                    ) : (
                      <ALink href="/seller/account">Vendre sur Nunua</ALink>
                    )}
                  </li>
                  
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div> */}

      <div className="header-middle">
        <div className={containerClass}>
          <div className="header-left">
            <button className="mobile-menu-toggler" onClick={openMobileMenu}>
              <span className="sr-only">Toggle mobile menu</span>
              <i className="icon-bars"></i>
            </button>

            <ALink href="/" className="logo">
              <img src="/images/logo.png" alt="" width="150px" />
            </ALink>
          </div>

          <div className="header-center">
            <HeaderSearch />
          </div>

          <div className="header-right">
            <LoginModal open={open} setOpen={setOpen} />
            <div className="header-dropdown-link">
              {/* <CompareMenu /> */}

              <button
                onClick={navigate}
                style={{
                  justifyContent: "center",
                  paddingRight: 30,
                  paddingBottom: 10,
                  paddingTop: 10,
                  paddingLeft: 30,
                  alignItems: "center",
                  backgroundColor: "#44cef5",
                  borderRadius: 40,
                  color: "#fff",
                }}
                title=""
              >
                VENDRE
              </button>

              {/* <WishlistMenu />

              <CartMenu /> */}
            </div>
          </div>
        </div>
      </div>

      {/* <StickyHeader>
        <div className="header-bottom sticky-header">
          <div className={containerClass}>
            <div className="header-left">
              <CategoryMenu />
            </div>

            <div className="header-center">
              <MainMenu />
            </div>

            <div className="header-right overflow-hidden">
              <i className="la la-lightbulb-o"></i>
              <p>Clearance Up to 30% Off</p>
            </div>
          </div>
        </div>
      </StickyHeader> */}

      <StickyHeader>
        <div className="header-bottom sticky-header">
          <div className="container">
            <div className="header-left">
              {show && (
                <ALink href="/" className="logo">
                  <img src="images/logo.png" alt="" width="100px" />
                </ALink>
              )}
              <CategoryMenu
                show={show}
                loading={loadingCategory}
                data={category}
              />
            </div>
            <div className="header-center">
              {show ? <HeaderSearch data={data} /> : <MainMenu />}
            </div>
            {show && (
              <div className="header-right">
              <LoginModal open={open} setOpen={setOpen} />
              <div className="header-dropdown-link">
                {/* <CompareMenu /> */}
  
                <button
                  onClick={navigate}
                  style={{
                    justifyContent: "center",
                    paddingRight: 30,
                    paddingBottom: 10,
                    paddingTop: 10,
                    paddingLeft: 30,
                    alignItems: "center",
                    backgroundColor: "#44cef5",
                    borderRadius: 40,
                    color: "#fff",
                  }}
                  title=""
                >
                  VENDRE
                </button>
  
                {/* <WishlistMenu />
  
                <CartMenu /> */}
              </div>
            </div>
            )}
          </div>
        </div>
      </StickyHeader>
    </header>
  );
}

export default Header;
