const express = require('express');
const cors = require('cors');
const mongoose=require('mongoose')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());


const uri = process.env.atlas;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true  }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const coachingRouter = require('./routes/coaching');
const commercialRouter = require('./routes/commercial');


//route dosyasindan import edilen users dosyasi burada islenerek DB ye gonderiliyor
app.use('/coaching', coachingRouter);
app.use('/commercial', commercialRouter);



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
