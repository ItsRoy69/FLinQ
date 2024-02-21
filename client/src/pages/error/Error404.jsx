import React from "react";
import error404Svg from "../../assets/error404.svg";
import "./error404.css";
function Error404() {
  return (
    <>
      <img src={error404Svg} alt="error-404" className="error-img" />
      <div className="button-wrapper home-btn">
        <button href="/">Back to Home</button>
      </div>
    </>
  );
}

export default Error404;
