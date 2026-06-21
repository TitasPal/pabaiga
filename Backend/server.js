require('dotenv').config();
const express = require('express');
const app = express();
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');
require('./db'); // initializes SQLite + creates tables

const PORT = process.env.PORT || 3000;
const FRONTEND = process.env.FRONTEND;

const corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});