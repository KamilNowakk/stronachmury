const { Client } = require("pg");

module.exports = async function (context, req) {
  const client = new Client({
    host: "c-chmury-prezentacja.uhvt376mj3mfh7.postgres.cosmos.azure.com",
    port: 5432,
    user: "citus",
    password: process.env.DB_PASSWORD,
    database: "citus",
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const res = await client.query("SELECT * FROM products ORDER BY id");
    await client.end();

    context.res = {
      headers: { "Content-Type": "application/json" },
      body: res.rows,
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: { error: err.message },
    };
  }
};
