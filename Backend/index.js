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


app.get("/comments/getAll" , async(req,res)=>{
    try{
        let  allComments=await client.comment.findMany() ;
        
       // console.log("all   comments ",allComments);
        res.status(200).json({
            status:"succes",
            data:allComments
        })
    }catch(err)
    {
        console.log(err,"Error in getting all comments");
        res.status(404).status({
            status:"failed",
            message:"Unable to load comments at this moment"
        })
    }
})


app.get("/blogs/getAll" , async(req,res)=>{
    try{
        let allBlogs = await  client.blogs.findMany();
    //    console.log('all blog, ', allBlogs);
        
        res.status(200).json({
            status:"success",
            data:allBlogs
        })
    }catch(err)
    {
        console.log(err);
        res.status(400).json({
            status:"failed",
            message:"Unable to fetch Blogs"
        })
    }
})

app.post("/blogs/create", async(req, res)=>{
    try{

        const {id , title , content , image, author , authorId} = req.body;
        // const author = req.user.username;
        // const authorId = req.user.id;

        // console.log(client)

        const  newBlog = await client.blogs.create({
            data:{
                title ,
                content ,
                image ,
                author ,
                authorId
            }
        });

        if(!newBlog){
            return res.status(400).json({
                status : "failed",
                message : "Something went wrong while creating the blog!"
            })
        }

        res.status(201).json({
            status : 'success',
            data : newBlog
        })

    }catch(err)
    {
        console.log(err);
        res.status(400).json({
            status:"failed",
            message:"Unable to create blog"
        })
    }
})

app.delete("/blogs/delete/:id", async(req,res)=>{
    try{
        // console.log(req.params, "req.params")
        const {id} = req.params
        const blogId = parseInt(id);
        console.log(id)
        let delBlog = await client.blogs.delete({
            where:{
                id:blogId
            }
        })

        console.log(delBlog)

        if(!delBlog)
        {
            return  res.status(404).json({
                status:"failed",
                message:"Unable to delete at this moment"
            })
        }

        res.status(200).json({
            status:"success",
            message:"Deleted successfully"
        })

    }catch(err)
    {
        console.log(err)
        res.status(400).json({
            status:"failed",
            message:err.message
        })
    }
})

app.patch("/blogs/update/:id", async(req,res)=>{
    try{
        const {id} = req.params
        const blogId = parseInt(id);
        const {title, content, image} = req.body;

        const updatedBlog = await client.blogs.update({
            where:{
                id:blogId
            },
            data:{
                title,
                content,
                image
            }
        })

        if(!updatedBlog)
        {
            return res.status(400).json({
                status:"failed",
                message:"Unable to update at the moment"
            })
        }

        res.status(200).json({
            status:"success",
            data:updatedBlog
        })

    }catch(err)
    {
        console.log(err)
        res.status(500).json({
            status:"failed",
            message:err.message
        })
    }
})

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
