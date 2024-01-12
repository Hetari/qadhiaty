const OFF = require("openfoodfacts-nodejs");
const express = require("express");
const axios = require("axios");
const {
  db,
  getAllProducts,
  getProductById,
  getProductByName,
  getCountryByName,
} = require("./database/db.js");
// const client = new OFF();
const app = express();
const port = 3000;

const allProducts = getAllProducts();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/:barcode", async (req, res) => {
  try {
    const barcode = req.params.barcode;
    if (isNaN(Number(barcode))) {
      return res
        .status(500)
        .json({ barcode: false, error: "Please enter a valid barcode" });
    }

    const apiUrl = `https://world.openfoodfacts.org/api/v2/product/${barcode}?fields=brands,countries`;
    const response = await axios.get(apiUrl);
    const product = response.data.product;

    if (product) {
      const brandName = product.brands.split(",");
      const brandCountries = product.countries.split(",");

      const brandNameArray = brandName
        .map((name) => {
          let n = name.trim().toLowerCase();
          n = n.split(" ");
          return n;
        })
        .flat();

      const brandCountriesArray = brandCountries
        .map((country) => {
          let c = country.trim().toLowerCase();
          c = c.split(" ");
          return c;
        })
        .flat();

      let result = null;
      for (const name of brandNameArray) {
        result = await getProductByName(name.toLowerCase());
        if (result) break;
      }
      if (!result) {
        for (const name of brandCountriesArray) {
          result = await getCountryByName(name.toLowerCase());
          if (result) break;
        }
      }

      if (!result)
        res.status(200).json({
          barcode: true,
          buy: true,
        });

      res.status(200).json({
        barcode: true,
        buy: false,
      });
    } else {
      res.status(404).json({
        barcode: true,
        error: "Product not found or data is incomplete.",
        buy: null,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ barcode: true, error: "Internal server error", buy: null });
  }
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log(`Connected to ${process.env.DATABASE} database`);

    // Start listening to the specified port
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
