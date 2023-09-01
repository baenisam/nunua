import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "~/context/GlobalContext";
import useAsync from "~/Hooks/useAsync";
import SettingServices from "~/services/SettingServices";
import useSettingSubmit from "~/Hooks/useSettinSubmit";
import ALink from "~/components/features/alink";
import { UserContext } from "~/context/UserContext";


function Footer() {
  const router = useRouter("");
  const [isBottomSticky, setIsBottomSticky] = useState(false);
  const [containerClass, setContainerClass] = useState("container");
  const { data: globalSettings } = useAsync(SettingServices.globalSettings);
  const {setOpen, setRedirection} = useContext(GlobalContext)
  const { joinNewsLetter, loading } = useSettingSubmit();
  const [email, setEmail] = useState("");
  const {
    dispatch,
    state: { userInfo },
  } = useContext(UserContext);

  useEffect(() => {
    document.querySelector(".footer-middle").classList.remove("border-0");
    if (router.pathname == "/")
      document.querySelector(".footer-middle").classList.add("border-0");

    handleBottomSticky();
    setContainerClass(
      router.asPath.includes("fullwidth") ? "container-fluid" : "container"
    );
  }, [router.asPath]);

  useEffect(() => {
    window.addEventListener("resize", handleBottomSticky, { passive: true });
    return () => {
      window.removeEventListener("resize", handleBottomSticky);
    };
  }, []);

  function handleBottomSticky() {
    setIsBottomSticky(
      router.pathname.includes("product/default") && window.innerWidth > 991
    );
  }

  const submit = (e) => {
    e.preventDefault();
    joinNewsLetter(email);
    setEmail("")
  };
  const navigate = () => {
    if(userInfo?.token){
      router.push("/user/wishlist")
    } else {
      setRedirection("/user/wishlist")
      setOpen(true)
    }
  }

  const onNavigate = (path) => {
    if(userInfo?.token){
      router.push(path)
    } else {
      setRedirection(path)
      setOpen(true)
    }
  }

  return (
    <>
      <div className="cta cta-horizontal cta-horizontal-box bg-primary">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-2xl-5col col-12">
              <h3 className="cta-title text-white">Rejoignez notre newsletter</h3>

              <p className="cta-desc text-white">
              Abonnez-vous pour obtenir des informations sur les produits et services
              </p>
            </div>

            <div className="col-3xl-5col col-12">
              <form onSubmit={submit}>
                <div className="input-group">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      borderRadius: 30,
                    }}
                    type="email"
                    className="form-control form-control-white"
                    placeholder="Entrez votre adresse email"
                    aria-label="Email Adress"
                    required
                  />
                  <div className="input-group-append">
                    {loading ? (
                      <button
                        disabled={true}
                        className="btn btn-outline-white-2"
                        type="submit"
                      >
                        <span>Veuillez patienter...</span>
                        <i className="icon-long-arrow-right"></i>
                      </button>
                    ) : (
                      <button
                        disabled={loading}
                        className="btn btn-outline-white-2"
                        type="submit"
                      >
                        <span>S'abonner</span>
                        <i className="icon-long-arrow-right"></i>
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer footer-2">
        <div className="footer-middle border-0">
          <div className={containerClass}>
            <div className="row">
              <div className="col-sm-12 col-lg-6">
                <div className="widget widget-about">
                  <img
                    src="/images/logo.png"
                    className="footer-logo"
                    alt="Footer Logo"
                    width="105"
                    height="27"
                  />
                  <p>{globalSettings?.about_us?.substring(0, 200)}</p>

                  <div className="widget-about-info">
                    <div className="row">
                        <a href="#" className="col-lg-6 col-md-6 col-xl-6 col-6 col-sm-6">
                          <img
                            src="/images/icons/play.png"
                            width="100%"
                            height="10"
                            style={{
                              objectFit:'cover',
                              height:40,
                              borderRadius:50
                    
                            }}
                          />
                        </a>
                        <a href="#" className="col-lg-6 col-md-6 col-xl-6 col-6 col-sm-6">
                          <img
                            src="/images/icons/app.png"
                            width="100%"
                            height="10"
                            style={{
                              objectFit:'cover',
                              height:40,
                              borderRadius:50
                    
                            }}
                          />
                        </a>
                      
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-4 col-lg-2 col-6">
                <div className="widget">
                  <h4 className="widget-title">Informations</h4>

                  <ul className="widget-list">
                    <li>
                      <ALink href="/about-us">A propos de nous</ALink>
                    </li>
                    <li>
                      <ALink href="/">FAQ</ALink>
                    </li>
                    <li>
                      <ALink href="/contact-us">Nous contacter</ALink>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-4 col-lg-2 col-6">
                <div className="widget">
                  <h4 className="widget-title">Customer Service</h4>

                  <ul className="widget-list">
                    <li>
                      <ALink href="/">Payment Methods</ALink>
                    </li>
                    <li>
                      <ALink href="/">Money-back guarantee!</ALink>
                    </li>
                    <li>
                      <ALink href="/">Returns</ALink>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-4 col-lg-2 col-6">
                <div className="widget">
                  <h4 className="widget-title">Mon compte</h4>

                  <ul className="widget-list">
                    <li>
                      {userInfo?.token ?
                      <ALink href="/user/dashboard">Mon compte</ALink>
                      :
                      <ALink onClick={() => {
                        setRedirection("")
                        setOpen(true)
                      }} href="#">Se connecter</ALink>}
                    </li>
                    <li>
                      <ALink href="#" onClick={() => onNavigate('/user/my-adds')} >Mes annonces</ALink>
                    </li>
                    <li>
                      <ALink href="#" onClick={() => onNavigate('/settings/edit-profile')} >Reglages</ALink>
                    </li>
                    <li>
                      <ALink href="#" onClick={() => onNavigate('/settings/edit-company')} >Mon entreprise</ALink>
                    </li>
                    {/* <li>
                      <ALink href="#">Track My Order</ALink>
                    </li>
                    <li>
                      <ALink href="#">Help</ALink>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className={containerClass}>
            <p className="footer-copyright">
              Copyright © {new Date().getFullYear()} Endeleya Corporation.
            </p>
            <ul className="footer-menu">
              <li>
                <ALink href="/terms-conditions">Règles et conditions d'utilisation</ALink>
              </li>
              <li>
                <ALink href="/privacy-policy">Politique de confidentialité</ALink>
              </li>
            </ul>

            <div className="social-icons social-icons-color">
              <span className="social-label">Suivez-nous sur:</span>

              <ALink
                target="_blank"
                href={globalSettings?.facebook ? globalSettings?.facebook : "#"}
                className="social-icon social-facebook"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <i className="icon-facebook-f"></i>
              </ALink>
              {/* <ALink
                href="#"
                className="social-icon social-twitter"
                rel="noopener noreferrer"
                title="Twitter"
              >
                <i className="icon-twitter"></i>
              </ALink> */}
              <ALink
                target="_blank"
                href={
                  globalSettings?.instagram ? globalSettings?.instagram : "#"
                }
                className="social-icon social-instagram"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <i className="icon-instagram"></i>
              </ALink>
              <ALink
                target="_blank"
                href={globalSettings?.youtube ? globalSettings?.youtube : "#"}
                className="social-icon social-youtube"
                rel="noopener noreferrer"
                title="Youtube"
              >
                <i className="icon-youtube"></i>
              </ALink>
              <ALink
                target="_blank"
                href={globalSettings?.linkedin ? globalSettings?.linkedin : "#"}
                className="social-icon social-pinterest"
                rel="noopener noreferrer"
                title="Linkedin"
              >
                <i className="icon-linkedin"></i>
              </ALink>
            </div>
          </div>
        </div>
        {isBottomSticky ? <div className="mb-10"></div> : ""}
      </footer>
    </>
  );
}

export default React.memo(Footer);
