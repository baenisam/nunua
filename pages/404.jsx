import React from "react";
import ALink from "~/components/features/alink";
import MetaDocument from "~/components/Meta";
import Lottie from "react-lottie";
import * as animationData from "~/public/404.json";
function ErrorPage() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="main">
      <MetaDocument title={"Page not found"} />
      <nav className="breadcrumb-nav border-0 mb-0">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Accueil</ALink>
            </li>
            <li className="breadcrumb-item active">Page non trouvée</li>
          </ol>
        </div>
      </nav>

      <div
        className="error-content text-center position-relative"
        style={{ marginBottom: "-1px" }}
      >
        <div className="container">
          {/* <h1 className="error-title">Erreur 404</h1> */}
      
            <div className="text-center align-items-center justify-content-center">
              <Lottie options={defaultOptions} width={'40%'} />
            </div>
       

          <p>
            La page que vous recherchez est introuvable, veuillez vérifier le
            nom de la page
          </p>
          <ALink href="/" className="btn btn-outline-primary-2 btn-minwidth-lg">
            <span>Accueil</span>
            <i className="icon-long-arrow-right"></i>
          </ALink>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ErrorPage);
