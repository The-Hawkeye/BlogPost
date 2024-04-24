module.exports.getAll =  async(req,res)=>{
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
}

module.exports.create =  async(req,res)=>{

    try{

        const blogId = req.params.id;

    const author  = req.user.username;
    const authorId  = req.user.id;

    const {content} = req.body;

    const newComment  = await client.comment.create({
        data:{
            content,
            author,
            postId:blogId,
            author,
            authorId,
            createdAt:new Date.now()
        }
    })

    if(!newComment)
    {
        return res.status(400).json({
            status:"failed",
            message:"Unable to add comment at the moment"
        })
    }

    res.status(200).json({
        status:"success",
        data:newComment
    })

    }catch(err)
    {
        console.log(err);
        res.status(400).json({
            status:"failed",
            message:err.message
        }) 
    }
    
}