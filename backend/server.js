const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;

// Konfiguracja CORS
app.use(cors());
app.use(express.json());

// Konfiguracja połączenia z bazą danych PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true", // SSL wymagane w Azure Cosmos DB
});

// Endpoint do pobierania produktów
app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd bazy danych" });
  }
});

// Endpoint do dodawania produktów
app.post("/api/products", async (req, res) => {
  const { name, description, price, category } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO products (name, description, price, category) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, price, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd bazy danych" });
  }
});

// Start serwera
app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
