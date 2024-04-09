const express = require("express");
const cors = require("cors");
const userRouter = require('./routes/userRoutes')
const accountRouter = require('./routes/accountRoutes')
const app = express();
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json());


mongoose.connect("mongodb+srv://murali732000:DRNELJ77humGTQIU@cluster0.8pglltf.mongodb.net/Paytm");


const port = 8080 || 3000;




app.use('/api/v1/users', userRouter);
app.use('/api/v1/accounts', accountRouter)


app.listen(port, () => {
    console.log(`Port is running ${port}`);
});





module.exports = app;


