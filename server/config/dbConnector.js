const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DB_URL , {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then( ()=>{
        console.log("Connection with database successfull!")
    } ).catch( (error)=>{
        console.log("Cannot connect to database!");
        console.error(error);
        process.exit(1);
    } );
};

module.exports = dbConnect;