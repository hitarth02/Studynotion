const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema(
    {
        subSectionTitle:{
            type:String,
            required:true,
            trim:true,
        },
        subSectionDescription:{
            type:String,
            required:true,
            trim:true,
        },
        timeDuration:{
            type:String,
            trim:true,
        },
        videoUrl:{
            type:String,
            required:true,
            trim:true,
        },
    }
);

module.exports = mongoose.model("SubSection", subSectionSchema);