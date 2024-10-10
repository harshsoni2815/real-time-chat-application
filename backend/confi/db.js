const mongoose = require('mongoose');

let url = "mongodb://localhost:27017/RTCA";

const connect = async()=>{
    mongoose.connect(url).then(()=>{
        console.log("connect successfull databases");
    }).catch(()=>{
        console.log("something went wrong ");
    })
}

module.exports =connect;