import React from "react";
import Lottie from "react-lottie";
import * as animationData from "~/public/offline.json";
const Offline = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="empty-container">
      <div className="text-center align-items-center justify-content-center">
        <Lottie options={defaultOptions} height={350} width={350} />
        <h3 className="oups-text">Oups!!!</h3>
        <span className="text-center oup-text">Votre appareil n'es pas connecté à l'internet</span>
      </div>
    </div>
  );
};

export default Offline;