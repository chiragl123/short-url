const express = require("express");
const { connectToMogo } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const PORT = 8001;

const app = express();
connectToMogo("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error in connection : ", err));

app.use(express.json());
app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );

  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
