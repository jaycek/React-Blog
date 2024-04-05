const express = require("express");
const router = express.Router();
const jwt=require('jsonwebtoken');
const posts = require("../Model/post");

router.use(express.json());
function verifytoken(req,res,next) {
    const token=req.headers.token;
    try {
        if(!token) throw 'Unauthorized access';
        let payload=jwt.verify(token,'reactblogapp');
        if(!payload) throw 'Unauthorized access';
        next()
    } catch (error) {
        res.status(404).send('Caught in Error')
    }
   
    
}
router.get('/api/blogs',verifytoken,async(req,res)=>{
    try {
        const data= await posts.find();
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send('Data not found');
    }
   

})
// to add blog
router.post('/api/add',verifytoken,async(req,res)=>{
    try {
        const post = req.body;
        const data = await posts(post).save();
        res.status(200).send({message:"blog addedd"})
        console.log(data)

    } catch (error) {
        console.log(error)
    }
})

module.exports=router