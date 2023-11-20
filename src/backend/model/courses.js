const mongoose = require("mongoose");
const validator = require("validator");
// import mongooseIdValidator from "mongoose-id-validator";
// import validator from "validator";

let CourseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: String,
      required: true,
      trim: true,
    },
    semester: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: String,
      required: true,
      trim: true,
      // validate(value) {
      //   if (!validator.isFloat(value)) {
      //     console.log("omer1");
      //     throw new Error("amount must be a number");
      //   }
      // },
    },
    grade: {
      type: String,
      required: true,
      trim: true,
      // validate(value) {
      //   if (!validator.isFloat(value)) {
      //     console.log("omer");
      //     throw new Error("grade must be a number");
      //   }
      // },
    },
  },
  { timestamps: true }
);
const Courses = mongoose.model("Courses", CourseSchema);

module.exports = Courses;
