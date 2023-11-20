const express = require("express");
const Courses = require("./model/courses.js");

let router = express.Router();

function calcAverage(courses) {
  let amount = 0;
  let avrege = 0;
  courses.forEach((course) => {
    amount += Number(course.amount);
  });
  console.log("amount is :", amount);
  courses.forEach((course) => {
    avrege += (course.grade * course.amount) / amount;
  });
  return avrege;
}
router.get("/average", (req, res) => {
  Courses.find().then((courses) => {
    const average = calcAverage(courses);
    res.status(200).json({ average: average });
  });
});
router.get("/average/:year", (req, res) => {
  Courses.find({ year: req.params.year.slice(1) }).then((courses) => {
    const average = calcAverage(courses);
    res.status(200).json({ average: average });
  });
});
router.get("/average/:year/:semester", (req, res) => {
  const { year, semester } = req.params;
  Courses.find({ year: year.slice(1), semester: semester.slice(1) }).then(
    (courses) => {
      const average = calcAverage(courses);
      res.status(200).json({ average: average });
    }
  );
});

router.post("/courses", (req, res) => {
  const course = new Courses(req.body);
  console.log(course);
  course
    .save()
    .then((course) => {
      res.status(200).send(course);
      console.log("saved");
      return;
    })
    .catch((e) => {
      console.error("Error while saving the course:", e);
      res.status(400).send(e);
    });
});

router.get("/courses/:year/:semester", (req, res) => {
  const { year, semester } = req.params;
  Courses.find({ year: year.slice(1), semester: semester.slice(1) })
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((e) => res.status(400).send(e));
});
router.put("/courses/:id", (req, res) => {
  Courses.findByIdAndUpdate(
    req.params.id.slice(1),
    { $set: req.body },
    { new: true, runValidators: true }
  ).then((course) => {
    console.log(course);
    res.status(200).send(course);
  });
});

module.exports = router;
