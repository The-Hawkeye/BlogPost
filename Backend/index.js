const express  = require("express");
const dotenv = require("dotenv")
dotenv.config();
const cors = require("cors");
const app  = express();

const prisma = require("@prisma/client")
const client = new prisma.PrismaClient();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// app.use();

app.post("/admin/register", async(req,res)=>{
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
})


// app.get("/comments/getAll" , async(req,res)=>{
//     try{

//     }catch(err)
//     {

//     }
// })

app.use((req, res,next)=>{
    res.status(404).json({
        status:"failed",
        message:"Incorrect path entered"
    })
})

app.use((err, req,res ,next)=>{
    console.log(err);


    res.status(500).json({
        status:"failed",
        message:"Internal server error "
    })
})

module.exports = app;
