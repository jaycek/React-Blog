const express = require("express");
const router = express.Router();
const users = require("../Model/user");
const jwt=require('jsonwebtoken');
router.use(express.json());


// to create signup route
router.post('/',async(req,res)=>{
    try {
        const data =req.body;
        let newUser = await users(data).save();
        console.log(newUser);
        res.status(200).send({message:"Data added"})
    } catch (error) {
        console.log(error)
    }
})

// route for login
router.post('/api/login',async(req,res)=>{
    console.log(req.body);
    let username= req.body.username;
    let password =req.body.password;

    const user = await users.findOne({username:username});
    console.log(user)
    if(!user){
        res.json({message:"User not found"});
    }
    try {
       if(user.password==password) {
        let payload={user:username,pwd:password};
        let token=jwt.sign(payload,'reactblogapp');
        res.send({message:'login successful',token:token})
       }
       else{
        res.json({message:"Login failed"})
       }
    } catch (error) {
        console.log(error)
    }
})




module.exports = router;