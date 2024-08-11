const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb://localhost:27017/E-commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Creation
app.get("/", (req, res) => {
    res.send("Express app is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Creating upload Endpoint for images
app.use('/images', express.static('upload/images'));
app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    res.json({
        success: true,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema for creating products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        required: true,
    }
});

app.post('/addproduct', async (req, res) => {
    try {
        let products = await Product.find({});
        let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            available: true,
        });

        await product.save();
        console.log("Product saved:", product);

        res.json({
            success: true,
            product: product
        });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

// API for deleting products
app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Product removed with id:", req.body.id);
        res.json({
            success: true
        });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

// API for getting all products
app.get('/allproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("All products fetched");
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});


//Creating end point for newcollection data
app.get('/newCollections', async (req, res) => {
    try {
        let products = await Product.find({});
        let newcollection = products.slice(-8); // Get the last 8 items
        console.log("New Collection fetched");
        res.send(newcollection);
    } catch (error) {
        console.error("Error fetching new collection:", error);
        res.status(500).send("Internal Server Error");
    }
});

//Creating endpoint for popular in women Section
app.get('/popularinwomen', async (req, res) => {
    try {
        let products = await Product.find({ category: "women" });
        let popularInWomen = products.slice(0, 4); // Get the first 4 items
        console.log("Popular in Women is Fetched");
        res.send(popularInWomen);
    } catch (error) {
        console.error("Error fetching popular in women:", error);
        res.status(500).send("Internal Server Error");
    }
});





app.listen(port, (error) => {
    if (!error) {
        console.log('Server running on port:', port);
    } else {
        console.error("Error starting server:", error);
    }
});


//Schem creating for User Model
const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    CartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

//Creating endpoint for registering user
app.post('/signup', async (req, res) => {


let check = await Users.findOne({email:req.body.email});
if(check){
    return res.status(400).json({success:false,errors:"Existing user found with same email-id"})
}
let cart={};
for (let i=0;i<300;i++){
    cart[i]=0;
}
const user= new Users({
    name:req.body.username,
    email: req.body.email,
    password: req.body.password,
    CartData:cart,

})
await user.save();

const data={
    user:{
        id: user.id
    }
}

const token =jwt.sign(data,'secret_ecom');
res.json({success:true,token})

})



//creating endpoint for userlogin
app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data={
                user:{
                    id:user.id
                }

            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token})
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email-id"});
    }
})



