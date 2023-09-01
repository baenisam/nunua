import React from "react";
import ProtectedLayout from "./ProtectedLayout";
import ALink from "../features/alink";
import Sidebar from "../layouts/SideBar";
import Header from "../layouts/Header";
import MetaDocument from "../Meta";
import { Card, CardHeader } from "reactstrap";
const UserLayOut = ({ title, children }) => {
  return (
    <ProtectedLayout>
      <div className="main" style={{marginBottom:20}}>
        <MetaDocument title={title} />
        <nav className="breadcrumb-nav mb-3">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <ALink href="/">Accueil</ALink>
              </li>
              <li className="breadcrumb-item">
                <ALink href="/user/dashboard">Utilisateur</ALink>
              </li>
              <li className="breadcrumb-item active">{title}</li>
            </ol>
          </div>
        </nav>

        <div className="container">
          <div className="grid-container">
            <Sidebar OpenSidebar={true} />
            <main className='main-container'>
            {/* <Card style={{width:'100%'}} className="bg-white pt-3 pb-3 px-4 mb-2 justify-content-center d-flex">
              <CardHeader>
                <div class="d-flex justify-content-center align-items-center">
                  <span>{title}</span>
                </div>
              </CardHeader>
            </Card> */}
            {children}
                </main>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default UserLayOut;
