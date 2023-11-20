import React, { useEffect, useState } from "react";
import Carusel from "./component/Carusel";
import AddCourse from "./component/AddCourseForm";
import Course from "./component/Course";
import Heading from "./component/Heading";

let year = 1;
let semester = 1;

function App() {
  const [courses, setCourses] = useState([]); // course is an array represent the course of particular year and semester
  const [isClicked, setClick] = useState(false); // isClicked represants whether the user clicked the button or not
  const [isEdit, setEdit] = useState(-1);
  const [average, setAverage] = useState({
    year: "",
    yearAndSemester: "",
    total: "",
  });

  useEffect(() => {
    get(); // fetch the courses of year 1 and semster 1
  }, []);

  const get = async () => {
    const data = await fetch(
      `http://localhost:8000/courses/:${year}/:${semester}`
    );
    const jasonData = await data.json();

    setCourses(jasonData);

    updateAverages();
  };

  // fetch the courses acording the year and the semester defined in my carusel

  async function updateAverages() {
    let totalAverage = await calcaverage(0);
    let yearAverage = await calcaverage(1);
    let yearAndSemesterAverage = await calcaverage(2);
    setAverage({
      year:
        yearAverage === Math.round(yearAverage)
          ? yearAverage
          : yearAverage.toFixed(2),
      yearAndSemester:
        yearAndSemesterAverage === Math.round(yearAndSemesterAverage)
          ? yearAndSemesterAverage
          : yearAndSemesterAverage.toFixed(2),
      total:
        totalAverage === Math.round(totalAverage)
          ? totalAverage
          : totalAverage.toFixed(2),
    });
  }
  // when the user press on the forward arrow in the carusel udate the text and fetch the courses acording to the year and semester
  function handleForwardClick(obj) {
    obj.property === 0 ? (year = obj.val) : (semester = obj.val);
    get();
  }
  // when the user press on the backward arrow in the carusel udate the text and fetch the courses acording to the year and semester
  function handleBackwardClick(obj) {
    obj.property === 0 ? (year = obj.val) : (semester = obj.val);
    get();
  }
  //
  function handleClick() {
    if (isEdit === -1) {
      setClick(true);
    }
  }
  function submittedCourse(course, amount, grade, id) {
    console.log(id);
    let method = "POST";
    let URL = `http://localhost:8000/courses`;
    if (id !== null) {
      method = "PUT";
      URL = `http://localhost:8000/courses/:${id}`;
    }

    setClick(false);
    const myData = JSON.stringify({
      name: course,
      amount: amount,
      grade: grade,
      year: year.toString(),
      semester: semester.toString(),
    });

    //when adding the backend apply here the post request and set my courses state here.

    if (JSON.parse(myData).grade !== undefined) {
      fetch(URL, {
        method: method,

        body: myData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((course) => {
          return course.json();
        })
        .then((myCourse) => {
          if (myCourse.name) {
            setCourses((prev) => {
              if (id === null) return [...prev, myCourse];

              const newArr = [];
              prev.forEach((val) => {
                if (val._id === id) {
                  newArr.push(myCourse);
                } else {
                  newArr.push(val);
                }
              });
              return newArr;
            });
            updateAverages();
          }
        })
        .catch((e) => {
          console.log("error is : ", e);
        });
    }

    setEdit(-1); // in case the user edit course and does not create a new one
  }
  function handleEdit(id) {
    if (!isClicked) setEdit(id);
  }
  return (
    <>
      <Heading average={average.total} />
      <div className="container">
        <Carusel
          // text={firstCaruselText}
          id={0}
          average={average.year}
          handleForwardClick={handleForwardClick}
          handleBackwardClick={handleBackwardClick}
        />

        <Carusel
          // text={secondCaruselText}
          id={1}
          average={average.yearAndSemester}
          handleForwardClick={handleForwardClick}
          handleBackwardClick={handleBackwardClick}
        />
        <hr />
        {courses.length > 0 &&
          courses.map((course, index) => {
            if (isEdit === index) {
              return (
                <>
                  <AddCourse
                    key={index}
                    submittedCourse={submittedCourse}
                    amount={course.amount}
                    grade={course.grade}
                    name={course.name}
                    id={course._id}
                  />
                  <hr />
                </>
              );
            } else {
              return (
                <Course
                  handleEdit={handleEdit}
                  key={index}
                  id={index}
                  amount={course.amount}
                  grade={course.grade}
                  name={course.name}
                />
              );
            }
          })}
        {isClicked && <AddCourse submittedCourse={submittedCourse} />}
        {isClicked && <hr />}
        <div className="button-container">
          <button
            style={{
              // fontWeight: isClicked ? "100" : null,
              backgroundColor: isClicked ? "white" : null,
            }}
            type="button"
            onClick={() => {
              handleClick();
            }}
          >
            הוסף קורס +
          </button>
        </div>
      </div>
    </>
  );
}

async function calcaverage(coordinator) {
  let URL;
  if (coordinator === 0) URL = `http://localhost:8000/average`;
  else if (coordinator === 1) URL = `http://localhost:8000/average/:${year}`;
  else URL = `http://localhost:8000/average/:${year}/:${semester}`;

  let av = await fetch(URL);
  av = await av.json();
  return av.average;
}

export default App;
