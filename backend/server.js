const mongoose = require('mongoose');
const app =require('./index')

mongoose.connect("mongodb+srv://murali732000:DRNELJ77humGTQIU@cluster0.8pglltf.mongodb.net/Paytm", {
  useNewUrlParser: true,
    useUnifiedTopology: true,
  ssl:false,
});


const port = 8080 || 3000;



app.listen(port, () => {
    console.log(`Port is running ${port}`);
});
