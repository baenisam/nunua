import GoogleMapReact from "google-map-react";
import ALink from "~/components/features/alink";
import renderHTML from 'react-render-html';
import { useContext } from "react";
import GlobalContext from "~/context/GlobalContext";
import MetaDocument from "~/components/Meta";
const MapComponent = ({ text }) => <div>{text}</div>;

function Contact() {
  const {globalSettings} = useContext(GlobalContext)
  return (
    <div className="main">
        <MetaDocument title={"Contact"} description={"Utilisez le formulaire ci-dessous pour entrer en contact avec l'équipe commerciale"}/>
      <nav className="breadcrumb-nav border-0 mb-0">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Accueil</ALink>
            </li>
            <li className="breadcrumb-item active">Nous contacter</li>
          </ol>
        </div>
      </nav>

      <div className="container">
        <div id="map" className="w-100">
          {/* <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyCquR2MVNumRGQ_JneUWzYhZG6sDSL2jPY",
            }}
            defaultCenter={{ lat: -1.6852508823413872, lng: 29.2359639088428 }}
            defaultZoom={11}
          >
            <MapComponent lat={-1.6852508823413872} lng={29.2359639088428}  />
          </GoogleMapReact> */}
          {renderHTML('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15952.372479536634!2d29.2366872!3d-1.6849868!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dd05f4e34efc53%3A0xd1141041a45a8681!2sEndeleya%20SAS!5e0!3m2!1sfr!2scd!4v1692968193914!5m2!1sfr!2scd" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>')}
        </div>
      </div>

      <div className="page-content pb-0 mt-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-2 mb-lg-0">
              <h2 className="title mb-1">Contact Information</h2>
              <p className="mb-3">
              {renderHTML(`${globalSettings?.about_us?.length > 200 ? globalSettings?.about_us?.slice(0,200) + " ..." : globalSettings?.about_us}`)}
              </p>
              <div className="row">
                <div className="col-sm-7">
                  <div className="contact-info">
                    <h3>Bureau</h3>

                    <ul className="contact-list">
                      <li>
                        <i className="icon-map-marker"></i>
                       {globalSettings?.adresse}
                      </li>
                      <li>
                        <i className="icon-phone"></i>
                        <a href={`tel:${globalSettings?.phone}`}>{globalSettings?.phone}</a>
                      </li>
                      <li>
                        <i className="icon-envelope"></i>
                        <a href={`mailto:${globalSettings?.email}`}>{globalSettings?.email}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="title mb-1">Avez-vous des questions</h2>
              <p className="mb-2">
                Utilisez le formulaire ci-dessous pour entrer en contact avec
                l'équipe commerciale
              </p>

              <form action="#" className="contact-form mb-3">
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="cname" className="sr-only">
                      Votre noom complet
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cname"
                      placeholder="Votre noom complet *"
                      required
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="cemail" className="sr-only">
                      Votre adresse email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="cemail"
                      placeholder="Votre adresse email *"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="cphone" className="sr-only">
                      Votre téléphone
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="cphone"
                      placeholder="Votre téléphone *"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="csubject" className="sr-only">
                      Objet
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="csubject"
                      placeholder="Objet *"
                    />
                  </div>
                </div>

                <label htmlFor="cmessage" className="sr-only">
                  Message
                </label>
                <textarea
                  className="form-control"
                  cols="30"
                  rows="4"
                  id="cmessage"
                  required
                  placeholder="Message *"
                ></textarea>

                <button
                  type="submit"
                  className="btn btn-outline-primary-2 btn-minwidth-sm"
                >
                  <span>Envoyer</span>
                  <i className="icon-long-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>

          <hr className="mt-4 mb-5" />
        </div>
      </div>
    </div>
  );
}

export default Contact;
