const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
require("dotenv").config();
const connectionString = process.env.CONNECTION_STRING;
const { Pool } = require("pg");
const pool = new Pool({
  connectionString,
});

// middlewares here
app.use(cors());
app.use(express.json());

app.get("/todos", async (req, res) =>{
    try {
        const todo = await pool.query('select * from todo')
        res.json(todo.rows)
    } catch (err) {
        res.status(500).send(err)
    };
  })
// app.post("/todos", async (req, res) => {
//   try {
//     const { description } = req.body;
//     const todo = await pool.query(
//       "INSERT INTO todo (value) VALUES ($1) RETURNING*;",
//       [description]
//     );
//     res.json(todo.rows[0]);
//   } catch (err) {
//     res.status(500).send(err);
//     console.log(err);
//   }
// });

app.listen(PORT, () => {
  console.log(`this server is running on ${PORT}`);
});
