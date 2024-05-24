const express = require("express");
const cors = require("cors");
const createError = require("http-errors")
const multer = require("multer");
const { projectModel } = require("./models/projects.model");
const app = express();
app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json());




app.use(express.static("uploads"))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const name = Date.now() + '-' + file.originalname;
      cb(null, name)
    }
  })
  
  const upload = multer({ storage: storage })



  
  
app.get("/",async (req,res)=>{
    const allProduct = await projectModel.find()
    res.send({
        message : true,
        product : allProduct
    })   
})

app.post("/api/upload", upload.single("file"), async (req,res)=>{
    
    const obj = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }
    const {categorize,title,weblink} = req.body;;

    console.log(obj);
    const newProject = projectModel({
        "categorize": categorize,
        "title" : title,
        "weblink" : weblink,
        "image" : req.file.filename
    })

    await newProject.save(); 
    res.send({
        message : true,
        project : newProject
    })
})


app.use((req,res,next)=>{
    next(createError(404,"Route not found"));
})

app.use((err,req,res,next)=>{
    return res.status(err.status || 500).json({
        success : false,
        message : err.message
    })
})


module.exports = {app}