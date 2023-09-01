import React from "react";
import Invoices from "~/components/Invoices";
import ALink from "~/components/features/alink";
import MetaDocument from "~/components/Meta";
import ProtectedLayout from "~/components/user/ProtectedLayout";

const invoice = () => {
  return (
    <ProtectedLayout>
    <div className="main">
      <MetaDocument title="Facture" />
      <nav className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Accueil</ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href="/user/dashboard">Utilisateur</ALink>
            </li>
            <li className="breadcrumb-item active">Commandes</li>
          </ol>
        </div>
      </nav>
      <Invoices />
    </div>
    </ProtectedLayout>

  );
};

export default invoice;
