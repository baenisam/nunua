import React from "react";
import {AiFillLock} from 'react-icons/ai'
import {BiSolidUser,BiSolidMap} from 'react-icons/bi'
import { IoMdLogOut } from "react-icons/io";
import {GoOrganization} from 'react-icons/go'
import ALink from "../features/alink";
import useLoginSubmit from "~/Hooks/useLoginSubmit";
const SettingsMenu = () => {
  const { handleLogOut } = useLoginSubmit({ setModalOpen: false });
  return (
    <>
      <li className="sidebar-list-item">
        <ALink href="/settings/edit-profile">
          <BiSolidUser className="icon" /> Mes informations
        </ALink>
      </li>
      <li className="sidebar-list-item">
        <ALink href="/settings/edit-company">
          <GoOrganization className="icon" /> Details de l'entreprise
        </ALink>
      </li>
      <li className="sidebar-list-item">
        <ALink href="/settings/my-deliveries">
          <BiSolidMap className="icon" /> Mes lieux de livraisons
        </ALink>
      </li>
      <li className="sidebar-list-item">
        <ALink href="/settings/edit-password">
          <AiFillLock className="icon" /> Mot de passe
        </ALink>
      </li>

      <li className="sidebar-list-item">
        <ALink href="#" onClick={handleLogOut}>
          <IoMdLogOut className="icon" /> Se déconnecter
        </ALink>
      </li>
    </>
  );
};

export default SettingsMenu;
