import React, { useState } from "react";

function AddCourse(props) {
  const [inputsValuses, setInputsValues] = useState({
    course: props.name ? props.name : "",
    amount: props.amount ? props.amount.slice(0, 1) : "",
    grade: props.grade ? props.grade : "",
  });
  const [error, setError] = useState(0);
  //   console.log(props.amount);
  //   console.log(props.amount.slice(0, 1));

  function handleChange(e) {
    const { name, value } = e.target;
    setInputsValues((prevState) => {
      if (
        name === "course" ||
        (value.charAt(value.length - 1) >= "0" &&
          value.charAt(value.length - 1) <= "9")
      ) {
        return {
          ...prevState,
          [name]: value,
        };
      } else if (Number(value) === 0) {
        return {
          ...prevState,
          [name]: "",
        };
      }
      console.log(value);
      return {
        ...prevState,
      };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputsValuses);

    if (
      inputsValuses.grade === "" &&
      inputsValuses.amount === "" &&
      inputsValuses.course === ""
    ) {
      props.submittedCourse();
    }

    if (
      inputsValuses.grade === "" ||
      inputsValuses.amount === "" ||
      inputsValuses.course === ""
    ) {
      setError(3);
      return;
    } else if (inputsValuses.grade > 100) {
      setError(1);
      return;
    } else if (inputsValuses.amount > 30) {
      setError(2);
      return;
    }
    props.submittedCourse(
      inputsValuses.course,
      inputsValuses.amount,
      inputsValuses.grade,
      props.id ? props.id : null
    );
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="form-container">
        <input
          onChange={(e) => handleChange(e)}
          name="grade"
          value={inputsValuses.grade}
          placeholder="ציון"
        ></input>
        <input
          onChange={(e) => handleChange(e)}
          value={inputsValuses.amount}
          name="amount"
          placeholder='נ"ז'
        ></input>
        <input
          onChange={(e) => handleChange(e)}
          value={inputsValuses.course}
          name="course"
          placeholder="שם הקורס"
        ></input>
        <button type="submit">שמור</button>
      </div>
      {error > 0 && (
        <div className="error-container">
          {error === 1 && <p>ציון צריך להיות בין 0 ל100</p>}
          {error === 2 && <p>נ''ז צריך להיות לכל היותר 30</p>}
          {error === 3 && <p>צריך למלא את כל השדות</p>}
        </div>
      )}
    </form>
  );
}

export default AddCourse;
