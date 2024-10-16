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

app.listen(port, () => {
    console.log(`Server is running on port ${PORT}`); // Mensagem de confirmação
});
