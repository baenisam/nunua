import React, { useContext } from "react";
import { Avatar } from "antd";

import { UserContext } from "~/context/UserContext";
import useLoginSubmit from "~/Hooks/useLoginSubmit";
import Menu from "./Menu";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const { handleLogOut } = useLoginSubmit({ setModalOpen: false });
  const {
    dispatch,
    state: { userProfile },
  } = useContext(UserContext);
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-header">
        <div className="text-center">
          <Avatar
            size="sm"
            className="avatar"
            src={
              userProfile?.provider
                ? userProfile?.profil
                : process.env.NEXT_PUBLIC_ASSET_URL +
                  "users/" +
                  userProfile?.profil
            }
          />
        <br />
          <span>{userProfile?.full_name}</span>
          <div style={{marginTop:-10}}/>
          <small>{userProfile?.email}</small>
          <hr/>
        </div>
      </div>
      <div className="side-pause"></div>
      <br />

      <ul className="sidebar-list">
       <Menu/>
      </ul>
    </aside>
  );
}

export default Sidebar;
