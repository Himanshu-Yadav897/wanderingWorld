const express = require("express");
const app = express();

const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"public")));
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/", (req, res) => {
  res.send("working");
});

// app.get("/testListing", async (req, res)=>{
//   const sample = new listing({
//     title: "Villa",
//     description: "Premium villa ",
//     price : 5000,
//     location: "calgunate , Goa",
//     country : "India"
//   })

//   await sample.save();
//   console.log(sample);
//   res.send(" Working");
// })

// Index route
app.get("/listings", async (req, res) => {
  const allListing = await listing.find({});
  res.render("listings/index.ejs", { allListing });
});

// New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const one = await listing.findById(id);
  res.render("listings/show.ejs", { one });
});

// Create route
app.post("/listings", async (req, res) => {
  let newListing = new listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

// Edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const one = await listing.findById(id);
  res.render("listings/edit.ejs", { one });
});

// Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const one = await listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${one._id}`);
});

// Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const one = await listing.findByIdAndDelete(id);
  console.log(one);
  res.redirect("/listings");
});

app.listen(8080, (req, res) => {
  console.log("App is listening on port");
});
