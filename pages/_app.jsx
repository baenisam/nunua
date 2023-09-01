import { useEffect } from "react";
import { useStore } from "react-redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { UserProvider } from "~/context/UserContext.js";
import { ContextProvider } from "~/context/GlobalContext.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { wrapper } from "../store/index.js";
import Layout from "../components/layout";
import { actions as demoAction } from "../store/demo";
import { ToastContainer } from "../utils/toast.js";
import "~/public/scss/plugins/owl-carousel/owl.carousel.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { PrimeReactProvider } from "primereact/api";
import NextNProgress from "nextjs-progressbar";
import "~/public/scss/style.scss";
import "~/public/css/style.css";
import "~/public/css/custom.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@inovua/reactdatagrid-enterprise/index.css";


const WrappedApp = ({ Component, pageProps }) => {
  const store = useStore();

  useEffect(() => {
    if (store.getState().demo.current != process.env.NEXT_PUBLIC_DEMO) {
      store.dispatch(demoAction.refreshStore(process.env.NEXT_PUBLIC_DEMO));
    }
  }, []);

  



  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <PrimeReactProvider>
        <UserProvider>
          <ContextProvider>
            <Provider store={store}>
              <PersistGate
                persistor={store.__persistor}
                loading={
                  <div className="loading-overlay">
                    <div className="bounce-loader">
                      <img src="/images/logo-icon.png" className="mb-3" />
                      <div
                        style={{
                          color: "#44cef5",
                          backgroundColor: "44cef5",
                        }}
                        className="bounce1"
                      ></div>
                      <div
                        style={{
                          color: "#44cef5",
                          backgroundColor: "44cef5",
                        }}
                        className="bounce2"
                      ></div>
                      <div
                        style={{
                          color: "#44cef5",
                          backgroundColor: "44cef5",
                        }}
                        className="bounce3"
                      ></div>
                    </div>
                  </div>
                }
              >
                <Layout>
                  <NextNProgress />

                  <Component {...pageProps} />
                </Layout>
                <ToastContainer />
              </PersistGate>
            </Provider>
          </ContextProvider>
        </UserProvider>
      </PrimeReactProvider>
    </GoogleOAuthProvider>
  );
};

WrappedApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default wrapper.withRedux(WrappedApp);
