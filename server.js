const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

app.use(express.json());
app.use(express.static("public"));

const short = require("./routes.js");
app.use(short);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  mongoose
    .connect(
      "mongodb+srv://serega210699:17011980m@cluster0.wffnk.mongodb.net/Link-short?retryWrites=true&w=majority",
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("MongoDB connect"))
    .catch((e) => console.log(e));
  console.log(`Server is running`);
});
