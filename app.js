const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
require('./DB/connection');
const cors = require('cors');
const userRoute = require('./Routes/userRoutes');
const postroute = require('./Routes/postRoute');
const PORT = process.env.PORT;

const app = express();

//added for deployment
const path = require('path');
app.use(express.static(path.join(__dirname,'/build')));

app.use(morgan('dev'));
app.use(cors());

app.use('/api',userRoute)
app.use('/api',postroute);
app.get('/*', function(req, res) 
{ res.sendFile(path.join(__dirname ,'/build/index.html')); });

app.listen(PORT,()=>{
    console.log(`${PORT} is up and running`);
})