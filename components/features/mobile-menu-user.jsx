import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import SlideToggle from "react-slide-toggle";
import SettingServices from "~/services/SettingServices";
import useAsync from "~/Hooks/useAsync";
import ALink from "~/components/features/alink";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";

function MobileMenuUser({ data }) {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeComplete", hideMobileMenuUser);
  }, []);

  function hideMobileMenuUser() {
    document.querySelector("body").classList.remove("umenu-active");
  }

  return (
    <div className="mobile-menu-container1">
      <div className="mobile-menu-wrapper1">
        <span className="mobile-menu-close" onClick={hideMobileMenuUser}>
          <i className="icon-close"></i>
        </span>

        <Tabs defaultIndex={0} selectedTabClassName="show">
          <TabList className="nav nav-pills-mobile" role="tablist">
            <Tab className="nav-item text-center">
              <span className="nav-link">Menu</span>
            </Tab>
          </TabList>

          <div className="tab-content">
            <TabPanel>
              <nav className="mobile-nav">
                <ul className="sidebar-list">
                  <li className="sidebar-list-item">
                    <a href="">
                      <BsGrid1X2Fill className="icon" /> Dashboard
                    </a>
                  </li>
                  <li className="sidebar-list-item">
                    <a href="">
                      <BsFillArchiveFill className="icon" /> Products
                    </a>
                  </li>
                  <li className="sidebar-list-item">
                    <a href="">
                      <BsFillGrid3X3GapFill className="icon" /> Categories
                    </a>
                  </li>
                  <li className="sidebar-list-item">
                    <a href="">
                      <BsPeopleFill className="icon" /> Customers
                    </a>
                  </li>
                  <li className="sidebar-list-item">
                    <a href="">
                      <BsListCheck className="icon" /> Inventory
                    </a>
                  </li>
                  <li className="sidebar-list-item">
                    <a href="">
                      <BsMenuButtonWideFill className="icon" /> Reports
                    </a>
                  </li>
                  <li className="sidebar-list-item">
                    <a href="">
                      <BsFillGearFill className="icon" /> Setting
                    </a>
                  </li>
                </ul>
              </nav>
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default React.memo(MobileMenuUser);
