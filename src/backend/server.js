const express = require("express");
require("./db/mongoose.js");
(bodyParser = require("body-parser")), (routers = require("./routes.js"));
const cors = require("cors");
const app = express();
const port = 8000;
const corsOptions = {
  origin: "*",

  useSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routers);
app.listen(port, () => console.log("listenning on port 8000"));
