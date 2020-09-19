const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

const app = express();

dotenv.config();
const port = process.env.PORT || 4000;
const key = process.env.KEY;

app.use(cors());

app.get('/fetch-nearby',async (req,res)=>{
    const {lat,lng,radius = 500} = req.query;
    
    if(!lat || !lng){
        return res.status(401).json({
            message:'invalid params'
        });
    }

    try{
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&key=${key}`;
        const response = await fetch(url);
        if(response.ok){
            const json = await response.json();
            if(json.status == 'OK'){
                return res.status(200).json({
                    data: json.results
                });
            }else{
                return res.status(200).json({
                    message: 'Some error while fetching places'
                });
            }
        }else{
            res.status(500).json({
                message:'Internal Server Error'
            });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'Internal Server Error'
        });
    }
})

app.listen(port,()=>{
    console.log('Server running on ' + port);
})