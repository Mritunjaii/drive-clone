const express=require('express')
const routes=express.Router();
const { body, validationResult } = require('express-validator');
const userModel=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
// routes.get('/test',(req,res)=>{
//     res.send('test hell')
// })

routes.get('/register',(req,res)=>{
    res.render('register');
})


routes.post('/register',
    body('email').trim().isEmail().isLength({min:10}),
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:3}),
    async (req,res)=>{
        const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({
                error:error.array(),
                message: "invaild data"
            })
        }
    // console.log(req.body);
    // res.send("done");
    const {username,email,password}=req.body;
    
    const hashPassword=await bcrypt.hash(password,10);
    const newUser= await userModel.create({
        username,
        email,
        password:hashPassword
    })
    res.redirect(`${req.protocol}://${req.get('host')}/user/login`)
    // res.json(newUser);

})

routes.get('/login',(req,res)=>{
    res.render('login');
})

routes.post('/login',
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:5}),
    async (req,res)=>{
        const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({
                error:error.array(),
                message: "invaild data"
            })
        }
        const {username,password}=req.body;

        const user=await userModel.findOne({username:username});
        if(!user){
            res.status(400).json({
                message:"Username or password inncorrect"
            })
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            res.status(400).json({
                message:"Username or password inncorrect"
            })
        }

        const token=jwt.sign({
            userId:user._id,
            email:user.email,
            username:user.username
        },process.env.JWT_SECRET)
        res.cookie('token',token);
        res.redirect(`${req.protocol}://${req.get('host')}/home`)
        // res.send('login');
    }
)



module.exports=routes;