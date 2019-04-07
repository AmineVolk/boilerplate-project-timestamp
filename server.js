// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp/:date_string", (req, res) => {
  let dateInPath = req.params.date_string;
  let dateAfterParsing = new Date(dateInPath);

  if (dateAfterParsing != "Invalid Date") {
    res.json({
      unix: dateAfterParsing.getTime(),
      utc: dateAfterParsing.toUTCString()
    });
  } else {
    res.json({ unix: null, utc: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
