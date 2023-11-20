const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/courses-manager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
