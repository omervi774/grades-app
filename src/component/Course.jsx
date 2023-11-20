import React from "react";
import CreateIcon from "@mui/icons-material/Create";

function Course(props) {
  return (
    <>
      <div className="course-container">
        <div>
          <p>{props.grade}</p>
          <hr />
          <p>{props.amount}</p>
        </div>
        <div>
          <p>{props.name}</p>
          <CreateIcon
            style={{ marginRight: "1rem" }}
            onClick={() => props.handleEdit(props.id)}
          />
        </div>
      </div>
      <hr />
    </>
  );
}
export default Course;
