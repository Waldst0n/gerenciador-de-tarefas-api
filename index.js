const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectToDatabase = require('./src/database/mongoose.database');
const TaskRouter = require('./src/routes/task.routes');

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

connectToDatabase();

app.use('/tasks', TaskRouter);

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 8000,
}).then(() => {
    console.log('Http Server Running');
});
