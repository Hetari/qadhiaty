const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM products", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM products WHERE id = ?", [id], (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getCountryByName = (name) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM countries WHERE name LIKE ?",
      [`%${name}%`],
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

const getProductByName = (name) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM products WHERE name LIKE ?",
      [`%${name}%`],
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

module.exports = {
  db,
  getAllProducts,
  getProductById,
  getProductByName,
  getCountryByName,
};
