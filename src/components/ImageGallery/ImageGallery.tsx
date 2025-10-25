/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  property1: "variant-4" | "variant-3";
  className: any;
  rectangleClassName: any;
  overlapGroupClassName: any;
  groupClassName: any;
  ellipseClassName: any;
  ellipseClassNameOverride: any;
  divClassName: any;
  divClassNameOverride: any;
  ellipseClassName1: any;
}

export const ImageGallery = ({
  property1,
  className,
  rectangleClassName,
  overlapGroupClassName,
  groupClassName,
  ellipseClassName,
  ellipseClassNameOverride,
  divClassName,
  divClassNameOverride,
  ellipseClassName1,
}: Props): JSX.Element => {
  return (
    <div className={`image-gallery ${property1} ${className}`}>
      {property1 === "variant-3" && (
        <>
          <img
            className={`rectangle ${rectangleClassName}`}
            alt="Rectangle"
            src="/img/rectangle-34624160.png"
          />

          <div className={`div-4 ${overlapGroupClassName}`}>
            <div className={`group ${groupClassName}`}>
              <div className={`ellipse ${ellipseClassName}`} />

              <div className={`ellipse-2 ${ellipseClassNameOverride}`} />

              <div className={`ellipse-3 ${divClassName}`} />

              <div className={`ellipse-4 ${divClassNameOverride}`} />

              <div className={`ellipse-5 ${ellipseClassName1}`} />
            </div>
          </div>
        </>
      )}

      {property1 === "variant-4" && (
        <div className="overlap-group">
          <img
            className="img"
            alt="Rectangle"
            src="/img/rectangle-34624145-1.png"
          />

          <img
            className="rectangle-2"
            alt="Rectangle"
            src="/img/rectangle-34624160-1.png"
          />

          <div className="div-4" />

          <div className="group-2">
            <div className="ellipse-6" />

            <div className="ellipse-2" />

            <div className="ellipse-3" />

            <div className="ellipse-4" />

            <div className="ellipse-7" />
          </div>
        </div>
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  property1: PropTypes.oneOf(["variant-4", "variant-3"]),
};
