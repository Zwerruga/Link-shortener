const router = require("express").Router();
const validUrl = require("valid-url");
const Url = require("./model.js");

router.get("/:urlCode", async (req, res) => {
  try {
    const { longUrl } = await Url.findOne({ urlCode: req.params.urlCode });
    return longUrl
      ? res.redirect(longUrl)
      : res.status(404).json("No URL Found");
  } catch (err) {
    res.redirect("/");
  }
});
router.post("/", async (req, res) => {
  const { longUrl } = req.body;
  if (validUrl.isUri(longUrl)) {
    try {
      const url = await Url.findOne({ longUrl });
      if (url) return res.json(url);

      const urlCode = (await Url.find().countDocuments()).toString(36);

      const newUrl = new Url({
        urlCode,
        longUrl,
      });
      await newUrl.save();
      res.json(newUrl);
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  } else {
    res.status(401).json("Invalid longUrl");
  }
});

module.exports = router;
