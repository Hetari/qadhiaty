const OFF = require("openfoodfacts-nodejs");
const express = require("express");
const axios = require("axios");

const client = new OFF();
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  try {
    const barcode = "5000112546415";
    const apiUrl = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`;
    const response = await axios.get(apiUrl);
    const product = response.data.product;

    if (product) {
      res.json(product);
    } else {
      res
        .status(404)
        .json({ error: "Product not found or data is incomplete." });
    }
  } catch (error) {
    console.error(
      "Error fetching data from Open Food Facts API:",
      error.message
    );
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
