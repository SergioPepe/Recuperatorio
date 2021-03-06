const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/search", async (req, res) => {
  const query = req.query.producto;

  const result = await axios.get(
    `https://api.mercadolibre.com/sites/MLA/search?q=${query}`
  );
  const desc = result.data.results.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    currency_id: p.currency_id,
    available_quantity: p.available_quantity,
    img: p.thumbnail,
    condition: p.condition,
  }));
  res.send(desc);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});