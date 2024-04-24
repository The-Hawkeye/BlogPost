const client = require("../db")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")




module.exports.register = async(req,res)=>{
    try{

        const {id, username ,  password, role} = req.body;

        const newUser = await client.user.create({
            data:{
                id,
                username,
                password, 
                role
            }
            });

        console.log(newUser, "User created");
        res.status(201).json({
            status : 'success',
            data:newUser
        })

    }catch(err)
    {
        console.log(err);
        res.status(400).json({
            status:"failed",
            message:"Failed to create new user"
        })
    }
}


module.exports.login =  async(req,res)=>{
    try{

        const {id, username ,  password, role} = req.body;

        const newUser = await client.user.create({
            data:{
                id,
                username,
                password, 
                role
            }
            });

        console.log(newUser, "User created");
        res.status(201).json({
            status : 'success',
            data:newUser
        })

    }catch(err)
    {
        console.log(err);
        res.status(400).json({
            status:"failed",
            message:"Failed to create new user"
        })
    }
}





// import User from "../models/user.model.js"
// import bcryptjs from "bcryptjs";
// import { errorHandler } from "../utils/error.js"
// import jwt from "jsonwebtoken";

// export const signup = async(req,res,next)=>{
//     console.log(req.body);

//     const {username, email, password} = req.body;

    
//     try{
//         const hashedPassword = await bcryptjs.hash(password, 10);
    
//         const newUser = new User({
//             username,
//             password:hashedPassword,
//             email
//         })
    
//         await newUser.save();
//         res.status(200).json({message:"User created successfully"})
        
//     }catch(err)
//     {
//         next(err);
//     }



//     // res.send("Hello");
 
// }

// export const signIn = async(req,res,next)=>{
//     const {email, password}=req.body;

//     if(!email||!password){
//         return next(errorHandler(404,"Email or Password is missing"));
//     }

//     try{

//         const validUser = await User.findOne({email});

//         if(!validUser)
//         {
//             return next(errorHandler(404, "User not found"));
//         }

//         const validPassword = await bcryptjs.compare(password, validUser.password)

//         if(!validPassword)
//         {
//             return next(errorHandler(403,'Wrong Credentials'));
//         }

//         const {password:pass, ...userData} = validUser._doc;

//         const token  = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
//         res.cookie('token',token,{httpOnly:true, expiresIn: new Date(Date.now()+ 24*60*60*30)}).status(200).json({
//             message: 'Logged in Successfully' ,
//             user : userData,
//             success:true
//         })


//     }catch(err)
//     {
//         return next(err);
//     }
// }