require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Server started on port ::: ${port}`));

app.get("/", (req, res)=> {
  res.send({status: "OK"});
})