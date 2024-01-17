import Comment from "../model/comment.js"


export const newComment=async(request,response)=>{
    try {
        const comment = await new Comment(request.body);
        comment.save();
        // console.log("HELLO FROM NEWCOMMENT")
        response.status(200).json({msg: "Comment saved successfully"});
    } catch (error) {
        response.status(500).json({msg: error.message});
    }
}


export const getComments=async(request,response)=>{
    try {
        const comments=await Comment.find({ postId: request.params.id });
        // console.log("HELLO FROM GETCOMMENTS")
        return response.status(200).json(comments);
    } catch (error) {
        return response.status(500).json({error: error.message});
    }
}


export const deleteComment=async(request,response)=>{
    try {
        const comment=await Comment.findById(request.params.id);
        await comment?.deleteOne();
        response.status(200).json({msg:"Comment deleted successfully"});
    } catch (error) {
        response.status(500).json({error: error.message});
    }
}