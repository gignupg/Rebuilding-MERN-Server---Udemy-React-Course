const express = require('express');
require('dotenv').config()
const connectDB = require('./config/db');
const cors = require('cors');

app = express();

connectDB();

app.use( express.json({ extended: true }));

app.use(cors());

const port = process.env.PORT || 5000

app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'))
app.use('/api/tasks', require('./routes/tasks'))


app.listen(port, '0.0.0.0', () => {
    console.log("Server running on port", port)
});