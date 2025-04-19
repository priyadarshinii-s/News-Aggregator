const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    postedBy: {
        type: String,
        required: true,
    },    
    // reliability: {
    //   type: Number,
    //   default: 0,
    // },
    // isVoting: {
    //   type: Boolean,
    //   default: false,
    // },
    // verified: {
    //   type: Boolean,
    //   default: false,
    // },
    // votes: {
    //   trustworthy: {
    //     type: Number,
    //     default: 0,
    //   },
    //   questionable: {
    //     type: Number,
    //     default: 0,
    //   },
    // },
  },
  {
    timestamps: true,
  }
);

// Create the model
const News = mongoose.model("News", newsSchema);

module.exports = News;

// title
// Content
// image
// category
// posted_by
