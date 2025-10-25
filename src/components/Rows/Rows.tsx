/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Element } from "../Element";
import { Info } from "../Info";
import "./style.css";

interface Props {
  property1:
    | "name-label"
    | "icon-name"
    | "icon-name-label"
    | "label-free-text"
    | "sub-section-title"
    | "free-text"
    | "name";
  className: any;
  divClassName: any;
  text: string;
  divClassNameOverride: any;
  overlapGroupClassName: any;
  text1: string;
  text2: string;
}

export const Rows = ({
  property1,
  className,
  divClassName,
  text = "Body 14pt",
  divClassNameOverride,
  overlapGroupClassName,
  text1 = "Label 11pt",
  text2 = "Caption 12pt",
}: Props): JSX.Element => {
  return (
    <div className={`rows ${property1} ${className}`}>
      {["free-text", "sub-section-title"].includes(property1) && (
        <div className={`body-6 ${divClassName}`}>
          {property1 === "free-text" && <>{text}</>}

          {property1 === "sub-section-title" && <>{text2}</>}
        </div>
      )}

      {property1 === "label-free-text" && (
        <>
          <div className={`body-7 ${divClassNameOverride}`}>{text}</div>

          <div className={`label-5 ${overlapGroupClassName}`}>{text1}</div>
        </>
      )}

      {["icon-name", "name-label", "name"].includes(property1) && (
        <Element
          className={`${property1 === "icon-name" ? "class" : "forty-eight-h-instance"}`}
          override={<Info className="instance-node" info="/img/info-20.png" />}
          property1="icon"
        />
      )}

      {["icon-name-label", "icon-name"].includes(property1) && (
        <div className="overlap">
          <Element
            className={`${property1 === "icon-name-label" ? "icon-2" : "class-2"}`}
            override={
              <Info className="instance-node" info="/img/info-20.png" />
            }
            property1="icon"
          />
          <div className="body-8">
            {property1 === "icon-name" && <>{text}</>}
          </div>
        </div>
      )}

      {property1 === "icon-name" && (
        <div className="overlap-group">
          <Element
            className="icon-2"
            override={
              <Info className="instance-node" info="/img/info-20.png" />
            }
            property1="icon"
          />
          <div className="indicator" />
        </div>
      )}

      {property1 === "icon-name-label" && (
        <>
          <Element
            className="forty-eight-h-instance"
            override={
              <Info className="instance-node" info="/img/info-20.png" />
            }
            property1="icon"
          />
          <div className="overlap-group-2">
            <Element
              className="action-2"
              override={
                <Info className="instance-node" info="/img/info-20.png" />
              }
              property1="icon"
            />
            <div className="label-6">{text1}</div>

            <div className="body-9">{text}</div>
          </div>
        </>
      )}

      {["name-label", "name"].includes(property1) && (
        <div className={`overlap-group-3 ${overlapGroupClassName}`}>
          <Element
            className="action-3"
            override={
              <Info className="instance-node" info="/img/info-20.png" />
            }
            property1="icon"
          />

          {property1 === "name-label" && (
            <>
              <div className="label-7">{text1}</div>

              <div className="body-10">{text}</div>
            </>
          )}

          {property1 === "name" && <div className="body-11">{text}</div>}
        </div>
      )}
    </div>
  );
};

Rows.propTypes = {
  property1: PropTypes.oneOf([
    "name-label",
    "icon-name",
    "icon-name-label",
    "label-free-text",
    "sub-section-title",
    "free-text",
    "name",
  ]),
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
};
