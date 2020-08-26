var request = require("request"),
  geojson = require("geojson"),
  express = require("express"),
  path = require("path");
bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/views", express.static("views"));

app.listen(3000, function (error) {
  if (error) throw error;
  console.log("Server created Successfully on PORT 3000");
});

var ISS_URL = "https://api.wheretheiss.at/v1/satellites/25544";

app.get("/api/location", function (req, res) {
  request(ISS_URL, function (err, resp, body) {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Unable to contact ISS API" });
      return;
    }
    var apiResponse = JSON.parse(body);
    var issGeoJSON = geojson.parse([apiResponse], {
      Point: ["latitude", "longitude"],
    });
    console.log(issGeoJSON.features[0].properties.id);
    console.log(issGeoJSON.features[0].properties.name);

    console.log(issGeoJSON.features[0].geometry.coordinates[0]);
    console.log(issGeoJSON.features[0].geometry.coordinates[1]);

    res.send(issGeoJSON);
  });
});
