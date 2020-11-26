const path = require("path"); //utility for cross OS path
const express = require("express");

const hbs = require("hbs"); //handlebars plugins for express

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

/*
Test purposes
    console.log(__dirname); //path to the directory fcurrent script lives in
    console.log(__filename); //complete path

    console.log(path.join(__dirname, '../public'));
*/

const app = express();
const port = 3000;

/*
    app.use(express.static(path.join(__dirname, "../public")));
*/

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views"); //assuming you change the default pathname from "view" to "templates" (customizing the location of the views directory)
const partialsPath = path.join(__dirname, "../templates/partials"); //reusable files

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//HBS TEMPLATING
//no need for file extension when called
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App HBS",
    name: "Andrew Mead",
  });
});

app.get("/about-wak", (req, res) => {
  res.render("about_wak", {
    title: "About",
    name: "Wulugu Naba",
  });
});

app.get("/help-wak", (req, res) => {
  res.render("help_wak", {
    title: "Help",
    note: "This is the official help page for programmer WAK website",
    name: "Wilfred Afagbegee",
  });
});

//NORMAL
app.get("/help", (req, res) => {
  //object ...return json
  res.send({
    name: "Wilfred",
    age: 33,
  });
});

app.get("/about", (req, res) => {
  //array ... return json
  res.send([
    {
      name: "Frank",
    },
    {
      name: "George",
    },
  ]);
});

app.get("/weather", (req, res) => {
  //query string (if no address is provided return error)
  //else eg. "http://localhost:3000/weather?address=ghana"
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  //default {} set for destructuring
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error }); //error:error
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location, //location:location
          address: req.query.address,
        });
      });
    }
  );
  /*
  res.send({
    forecast: "It is snowing",
    location: "Philadelphia",
    address: req.query.address,
  });
*/
});

app.get("/products", (req, res) => {
  //console.log(req.query);
  //query string (if there is no search term, execute below)
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

//404 Error Message (should always be last before the listen) - with .hbs
app.get("/help-wak/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Waki Wilfred",
    errorMessage: "Help Article Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Waki Wilfred",
    errorMessage: "Page Not Found",
  });
});

//LISTEN and start port
app.listen(port, () => {
  console.log(`Server started at Port: ${port}`);
});
