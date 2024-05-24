const mongoose = require("mongoose");

const projectsScheme = mongoose.Schema({
    categorize: {
        type: String,
        require: true   
    },
    title : {
        type: String,
        require: true,
    },
    weblink : {
        type: String,
        require: true
    },
    image : {
        type: String,
        require : true
    }
    
})

const projectModel = mongoose.model("prjectdata",projectsScheme);

module.exports = {projectModel}