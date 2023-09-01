import React from 'react'
import {
    BsGrid1X2Fill,
    BsListUl,
    BsFillGearFill,
  } from "react-icons/bs";
  import { IoMdLogOut } from "react-icons/io";
  import ALink from "../features/alink";
  import useLoginSubmit from "~/Hooks/useLoginSubmit";
const Menu = () => {
    const { handleLogOut } = useLoginSubmit({ setModalOpen: false });
  return (
    <>
    <li className="sidebar-list-item">
          <ALink href="/user/dashboard">
            <BsGrid1X2Fill className="icon" /> Tableau de bord
          </ALink>
        </li>
        <li className="sidebar-list-item">
          <ALink href="/user/my-adds">
            <BsListUl className="icon" /> Mes annonces
          </ALink>
        </li>
        {/* <li className="sidebar-list-item">
          <a href="">
            <BsFillBellFill className="icon" /> Notifications
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <AiFillMessage className="icon" /> Mes messages
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <AiFillMessage className="icon" /> Mes messages
          </a>
        </li> */}
        <li className="sidebar-list-item">
          <ALink href="/settings/edit-profile">
            <BsFillGearFill className="icon" /> Réglages
          </ALink>
        </li>
        <li className="sidebar-list-item">
          <ALink href="#" onClick={handleLogOut}>
            <IoMdLogOut className="icon" /> Se déconnecter
          </ALink>
        </li>
    </>
  )
}

export default Menu