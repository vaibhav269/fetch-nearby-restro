const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
const port = process.env.PORT || 4000;

app.use(cors());

app.listen(port,()=>{
    console.log('Server running on ' + port);
})