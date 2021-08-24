const mongoose = require("mongoose");
const { Schema } = mongoose;

const UrlSchema = new Schema({
  urlCode: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true, unique: true, trim: true },
});

module.exports = mongoose.model("Url", UrlSchema);
