import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Carusel(props) {
  const [caruselText, setCaruselText] = useState(
    props.id === 0 ? "שנה א" : "סמסטר א"
  );

  function forwardClick() {
    let obj = { property: 0, val: 0 };

    if (caruselText === "שנה א") {
      setCaruselText("שנה ב");
      obj.property = 0;
      obj.val = 2;
    } else if (caruselText === "שנה ב") {
      setCaruselText("שנה ג");
      obj.property = 0;
      obj.val = 3;
    } else if (caruselText === "שנה ג") {
      setCaruselText("שנה ד");
      obj.property = 0;
      obj.val = 4;
    } else if (caruselText === "שנה ד") {
      setCaruselText("שנה ה");
      obj.property = 0;
      obj.val = 5;
    } else if (caruselText === "שנה ה") {
      setCaruselText("שנה ו");
      obj.property = 0;
      obj.val = 6;
    } else if (caruselText === "שנה ו") {
      setCaruselText("שנה ז");
      obj.property = 0;
      obj.val = 7;
    } else if (caruselText === "סמסטר א") {
      setCaruselText("סמסטר ב");
      obj.property = 1;
      obj.val = 2;
    } else if (caruselText === "סמסטר ב") {
      setCaruselText("קורסים שנתיים");
      obj.property = 1;
      obj.val = 3;
    } else if (caruselText === "קורסים שנתיים") {
      setCaruselText("סמסטר ג");
      obj.property = 1;
      obj.val = 4;
    }
    props.handleForwardClick(obj);
  }
  function backClick() {
    let obj = { property: 0, val: 0 };
    if (caruselText === "שנה ז") {
      setCaruselText("שנה ו");
      obj.property = 0;
      obj.val = 6;
    } else if (caruselText === "שנה ו") {
      setCaruselText("שנה ה");
      obj.property = 0;
      obj.val = 5;
    } else if (caruselText === "שנה ה") {
      setCaruselText("שנה ד");
      obj.property = 0;
      obj.val = 4;
    } else if (caruselText === "שנה ד") {
      setCaruselText("שנה ג");
      obj.property = 0;
      obj.val = 3;
    } else if (caruselText === "שנה ג") {
      setCaruselText("שנה ב");
      obj.property = 0;
      obj.val = 2;
    } else if (caruselText === "שנה ב") {
      setCaruselText("שנה א");
      obj.property = 0;
      obj.val = 1;
    } else if (caruselText === "סמסטר ג") {
      setCaruselText("קורסים שנתיים");
      obj.property = 1;
      obj.val = 3;
    } else if (caruselText === "קורסים שנתיים") {
      setCaruselText("סמסטר ב");
      obj.property = 1;
      obj.val = 2;
    } else if (caruselText === "סמסטר ב") {
      setCaruselText("סמסטר א");
      obj.property = 1;
      obj.val = 1;
    }
    props.handleBackwardClick(obj);
  }

  return (
    <div className="carusel-container">
      <ArrowBackIosNewIcon
        style={{
          display:
            caruselText === "שנה ז" || caruselText === "סמסטר ג"
              ? "none"
              : null,
        }}
        onClick={() => forwardClick()}
      />
      <p
        style={{
          marginRight:
            caruselText === "שנה א" || caruselText === "סמסטר א" ? "45%" : null,
          marginLeft:
            caruselText === "שנה ז" || caruselText === "סמסטר ג" ? "45%" : null,
        }}
      >
        {caruselText + " : " + props.average}
      </p>
      <ArrowForwardIosIcon
        onClick={() => backClick()}
        style={{
          display:
            caruselText === "שנה א" || caruselText === "סמסטר א"
              ? "none"
              : null,
        }}
      />
    </div>
  );
}
export default Carusel;
