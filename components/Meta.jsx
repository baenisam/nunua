import React, {useContext} from "react";
import { Helmet } from "react-helmet";
import GlobalContext from "~/context/GlobalContext";
const MetaDocument = ({ title, description }) => {
  const {globalSettings} = useContext(GlobalContext)
  return (
    <Helmet>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="keywords" content="Nunua" />
      <meta name="author" content="d-themes" />
      <meta name="apple-mobile-web-app-title" content="Nunua" />
      <meta name="application-name" content="Nunua" />
      <meta name="msapplication-TileColor" content="#cc9966" />
      {/* <meta
      name="msapplication-config"
      content="images/icons/browserconfig.xml"
    /> */}
      <meta name="theme-color" content="#ffffff" />
      <meta
        name="description"
        content={
          description
            ? description
            : globalSettings?.about_us
        }
      />
      <title>{title ? title : ""} - {globalSettings?.app_name || "Nunua"}</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/icons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="/image/png"
        sizes="32x32"
        href="/images/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="/image/png"
        sizes="16x16"
        href="/images/icons/favicon-16x16.png"
      />
      <link rel="manifest" href="/images/icons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/images/icons/safari-pinned-tab.svg"
        color="#666666"
      />
      <link rel="shortcut icon" href="/images/icons/favicon.png" />
    </Helmet>
  );
};

export default MetaDocument;
