import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import ALink from "~/components/features/alink";

function CategoryMenu({ data, loading, show }) {
  const query = useRouter().query;
  const router = useRouter();

  function toggleDropdown(e) {
    e.preventDefault();

    if (
      document
        .querySelector(".category-dropdown .dropdown-menu")
        .classList.contains("show")
    ) {
      document
        .querySelector(".category-dropdown .dropdown-menu")
        .classList.remove("show");
    } else {
      document
        .querySelector(".category-dropdown .dropdown-menu")
        .classList.add("show");
    }
  }

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        title: category.name,
        value: category.id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }

    return myCategories;
  };

  useEffect(() => {
    document
      .querySelector(".category-dropdown .dropdown-menu")
      .classList.remove("show");

    if (router.pathname == "/")
      document
        .querySelector(".category-dropdown .dropdown-menu")
        .classList.add("show");
  }, [router.pathname]);

  return show ? (
    <div className="dropdown category-dropdown" style={{ marginRight: 10 }}>
      <a
        href="#"
        className="dropdown-toggle"
        title="Browse Categories"
        onClick={(e) => {
          toggleDropdown(e);
        }}
      >
        Catégories
      </a>

      <div className="dropdown-menu">
        <nav className="side-nav">
          <ul
            className="menu-vertical sf-arrows sf-js-enabled"
            style={{ touchAction: "pan-y" }}
          >
            {loading ? (
              <aside
                className={`col-lg-12 skel-shop-sidebar order-lg-first skeleton-body`}
              >
                <div className="skel-widget"></div>
                <div className="skel-widget"></div>
                <div className="skel-widget"></div>
                <div className="skel-widget"></div>
              </aside>
            ) : (
              data?.map((item) => (
                <li className={``}>
                  <ALink
                    className={`${
                      item.children?.length > 0 ? "sf-with-ul" : ""
                    } text-dark`}
                    href={{
                      pathname: "/shop",
                      query: { category: item.id },
                    }}
                  >
                    <i>
                      <img
                        className="rounded-circle"
                        style={{ width: 20 }}
                        src={
                          process.env.NEXT_PUBLIC_ASSET_URL +
                          "category/" +
                          item.image
                        }
                      />
                    </i>
                    <span className="mb-2">{item.name}</span>
                  </ALink>
                  {item.children?.length > 0 && (
                    <ul>
                      {item?.children.map((i) => (
                        <li>
                          <ALink
                            href={{
                              pathname: "/shop",
                              query: { category: i.id },
                            }}
                          >
                            {i.name}
                          </ALink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))
            )}
          </ul>
        </nav>
      </div>
    </div>
  ) : (
    <div className="dropdown category-dropdown">
      <a
        href="#"
        className="dropdown-toggle"
        title="Browse Categories"
        onClick={(e) => {
          toggleDropdown(e);
        }}
      >
        Catégories
      </a>

      <div className="dropdown-menu">
        <nav className="side-nav">
          <ul
            className="menu-vertical sf-arrows sf-js-enabled"
            style={{ touchAction: "pan-y" }}
          >
            {loading ? (
              <aside
                className={`col-lg-12 skel-shop-sidebar order-lg-first skeleton-body`}
              >
                <div className="skel-widget"></div>
                <div className="skel-widget"></div>
                <div className="skel-widget"></div>
                <div className="skel-widget"></div>
              </aside>
            ) : (
              data?.map((item) => (
                <li className={``}>
                  <ALink
                    className={`${
                      item.children?.length > 0 ? "sf-with-ul" : ""
                    } text-dark`}
                    href={{
                      pathname: "/shop",
                      query: { category: item.id },
                    }}
                  >
                    <i>
                      <img
                        className="rounded-circle"
                        style={{ width: 20 }}
                        src={
                          process.env.NEXT_PUBLIC_ASSET_URL +
                          "category/" +
                          item.icon
                        }
                      />
                    </i>
                    <span className="mb-2">{item.name}</span>
                  </ALink>
                  {item.children?.length > 0 && (
                    <ul>
                      {item?.children.map((i) => (
                        <li>
                          <ALink
                            href={{
                              pathname: "/shop",
                              query: { category: i.id },
                            }}
                          >
                            {i.name}
                          </ALink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default CategoryMenu;
