const express = require("express");
const cors = require("cors");
const userRouter = require('./routes/userRoutes')
const accountRouter = require('./routes/accountRoutes')
const app = express();
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(process.env.DATABASE_URL);



app.use('/api/v1/users', userRouter);
app.use('/api/v1/accounts', accountRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Port is running ${port}`);
});





module.exports = app;


