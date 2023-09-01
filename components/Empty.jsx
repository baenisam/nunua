import React from "react";
import Lottie from "react-lottie";
import * as animationData from "~/public/emptyy.json";
const Empty = () => {
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
        <span className="text-center">Aucune donnée</span>
      </div>
    </div>
  );
};

export default Empty;
