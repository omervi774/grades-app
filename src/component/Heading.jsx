import React from "react";
function Heading(props) {
  return (
    <>
      <div className="heading-container">
        <h1>ממוצע תואר : {props.average}</h1>
      </div>
      <hr></hr>
    </>
  );
}
export default Heading;
