import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import SlideToggle from "react-slide-toggle";
import SettingServices from "~/services/SettingServices";
import useAsync from "~/Hooks/useAsync";
import { UserContext } from "~/context/UserContext";
import ALink from "~/components/features/alink";
import Menu from "../layouts/Menu";
import SettingsMenu from "../layouts/SettingsMenu";

function MobileMenu({ data }) {
  const { data: globalSettings } = useAsync(SettingServices.globalSettings);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [cat, setCat] = useState("all");
  const {
    dispatch,
    state: { userInfo },
  } = useContext(UserContext);

  useEffect(() => {
    router.events.on("routeChangeComplete", hideMobileMenu);
  }, []);

  function hideMobileMenu() {
    document.querySelector("body").classList.remove("mmenu-active");
  }

  function onSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  function onSubmitSearchForm(e) {
    e.preventDefault();
    router.push({
      pathname: "/shop",
      query: {
        query: searchTerm,
      },
    });
  }

  return (
    <div className="mobile-menu-container">
      <div className="mobile-menu-wrapper">
        <span className="mobile-menu-close" onClick={hideMobileMenu}>
          <i className="icon-close"></i>
        </span>

        <form
          action="#"
          method="get"
          onSubmit={onSubmitSearchForm}
          className="mobile-search"
        >
          <label htmlFor="mobile-search" className="sr-only">
            Recherche
          </label>
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={onSearchChange}
            name="mobile-search"
            id="mobile-search"
            placeholder="Recherche..."
            required
          />
          <button className="btn btn-primary" type="submit">
            <i className="icon-search"></i>
          </button>
        </form>

        <Tabs defaultIndex={0} selectedTabClassName="show">
          <TabList className="nav nav-pills-mobile" role="tablist">
            <Tab className="nav-item text-center">
              <span className="nav-link">Menus</span>
            </Tab>
            {userInfo?.token && (
              <Tab className="nav-item text-center">
                <span className="nav-link">Mon compte</span>
              </Tab>
            )}
          </TabList>

          <div className="tab-content">
            <TabPanel>
              <nav className="mobile-nav">
                <ul className="mobile-menu">
                  <li className={`megamenu-container`} id="menu-home">
                    <ALink href="/">Accueil</ALink>
                  </li>
                  <li className={`megamenu-container`} id="menu-home">
                    <ALink href="/seller/account">Vendre sur nunua</ALink>
                  </li>

                  <li className={`megamenu-container`} id="menu-home">
                    <ALink href="/">A propos de nous</ALink>
                  </li>
                  <li className={`megamenu-container`} id="menu-home">
                    <ALink href="/">Contactez-nous</ALink>
                  </li>
                </ul>
              </nav>
            </TabPanel>

            <TabPanel>
              <nav className="mobile-nav">
                <ul className="sidebar-list">
                  {router.pathname.slice(1, 9) === "settings" ? (
                    <SettingsMenu />
                  ) : (
                    <Menu />
                  )}
                </ul>
              </nav>
            </TabPanel>
          </div>
        </Tabs>

        <div className="social-icons">
          <ALink
            href={globalSettings?.facebook ? globalSettings?.facebook : "#"}
            target="_blank"
            className="social-icon"
            title="Facebook"
          >
            <i className="icon-facebook-f"></i>
          </ALink>
          <ALink
            href={globalSettings?.linkedin ? globalSettings?.linkedin : "#"}
            target="_blank"
            className="social-icon"
            title="Linkedin"
          >
            <i className="icon-linkedin"></i>
          </ALink>
          <ALink
            href={globalSettings?.instagram ? globalSettings?.instagram : "#"}
            target="_blank"
            className="social-icon"
            title="Instagram"
          >
            <i className="icon-instagram"></i>
          </ALink>
          <ALink
            href={globalSettings?.youtube ? globalSettings?.youtube : "#"}
            target="_blank"
            className="social-icon"
            title="Youtube"
          >
            <i className="icon-youtube"></i>
          </ALink>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MobileMenu);
