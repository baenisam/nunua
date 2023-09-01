import React, { useContext } from "react";
import { Avatar } from "antd";
import SettingsMenu from "./SettingsMenu";
import { BiSolidChevronLeft } from "react-icons/bi";

import { UserContext } from "~/context/UserContext";
import { useRouter } from "next/router";

function SidebarSettings({ openSidebarToggle, OpenSidebar }) {
  const router = useRouter();
  const {
    state: { userProfile },
  } = useContext(UserContext);
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-header">
        <button
          onClick={() => router.back()}
          style={{
            alignItems: "center",
            color: "#44cef5",
            flexDirection: "row",
          }}
        >
          <BiSolidChevronLeft size={20} style={{ marginRight: 5 }} />
          Retour
        </button>
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
        <SettingsMenu />
      </ul>
    </aside>
  );
}

export default SidebarSettings;
