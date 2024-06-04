const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default : "https://unsplash.com/photos/white-wooden-pool-bench-near-house-rChFUMwAe7E",
    set: (v) =>
      v === ""
        ? "https://unsplash.com/photos/white-wooden-pool-bench-near-house-rChFUMwAe7E"
        : v,
  },
  image: String,
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
