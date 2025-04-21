const News = require("../models/News");

exports.createNews = async (req, res) => {
  try {
    const { title, description, imageUrl, time, category } = req.body;

    const news = await News.create({
      title,
      description,
      imageUrl,
      time,
      category,
      postedBy: req.user.id, // assuming token contains user id
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error posting news", error: error.message });
  }
};

exports.getAllNews = async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });
    res.json(newsList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error: error.message });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error: error.message });
  }
};
