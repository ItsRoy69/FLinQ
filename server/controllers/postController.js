const { default: mongoose } = require('mongoose');
const PostModel = require('../models/postModel');

// all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find({});
        if (!posts) {
            throw new Error("Could not fetch posts");
        }
        res.status(200).json({ message: "Fetched all posts", result: posts });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

// get post by id
const getPostById = async (req, res) => {
    try {
        const { id: _id } = await req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(422).json({ message: "Id not valid" });
        }
        const postExist = await PostModel.exists({ _id: _id });
        if (!postExist) return res.status(404).json({ message: "Post not found" });
        const post = await PostModel.findOne({ _id });
        if (!post) {
            throw new Error("Could not fetch post");
        }
        res.status(200).json({ message: "Fetched post", result: post });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

// create a new post
const addPost = async (req, res) => {
    try {
        const { userId: _id, image, postName, username, postedAt } = req.body;

        if (!username) {
            return res.status(400).json({ message: "Username is required in the request body" });
        }

        const newPostData = {
            userId: _id,
            image,
            username,
            postedAt: new Date(),
            comments: [],
            postName
        };

        const newpost = await PostModel.create(newPostData);
        res.status(201).json({ message: "Post created", result: newpost });

    } catch (error) {
        console.log(error?.message);
        res.status(400).json({ message: error?.message });
    }
};


// edit a post
const editPost = async (req, res) => {
    try {
        const { id: _id } = await req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(422).json({ message: "Id not valid" });
        }
        const postExist = await PostModel.exists({ _id: _id });
        if (!postExist) return res.status(404).json({ message: "Post not found" });
        const editedPost = await PostModel.findByIdAndUpdate(_id, req.body, { new: true });
        if (!editedPost) {
            throw new Error("Could not edit post");
        }
        // success
        res.status(200).json({ message: 'Post updated', result: editedPost });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }

}

// get posts by userId
const getUserPosts = async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(422).json({ message: "Id not valid" });
        }
        const userPosts = await PostModel.find({ userId: _id });
        res.status(200).json({ message: "Fetched Posts by User", result: userPosts });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}


// delete post
const deletePost = async (req, res) => {
    try {
        const { id: _id } = await req.params;
        const postExist = await PostModel.exists({ _id: _id });
        if (!postExist) {
            return res.status(404).json({ message: "Post doesn't exist" });
        }
        await PostModel.findByIdAndDelete(_id);
        res.status(200).json({ message: "Post deleted successfully" });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

// like a post
const likePost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(422).json({ message: "Id not valid" });
        }

        const postExist = await PostModel.exists({ _id: _id });
        if (!postExist) {
            return res.status(404).json({ message: "Post not found" });
        }

        const likedPost = await PostModel.findByIdAndUpdate(_id, { $addToSet: { likes: req.body.userId } }, { new: true });
        res.status(200).json({ message: 'Post liked', result: likedPost });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

// unlike a post
const unlikePost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(422).json({ message: "Id not valid" });
        }

        const postExist = await PostModel.exists({ _id: _id });
        if (!postExist) {
            return res.status(404).json({ message: "Post not found" });
        }

        const unlikedPost = await PostModel.findByIdAndUpdate(_id, { $pull: { likes: req.body.userId } }, { new: true });
        res.status(200).json({ message: 'Post unliked', result: unlikedPost });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

// add comments
const addComment = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const { userId, username, text } = req.body;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(422).json({ message: "Post Id not valid" });
        }

        const postExist = await PostModel.exists({ _id: postId });
        if (!postExist) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = {
            userId,
            username,
            text,
        };

        const updatedPost = await PostModel.findByIdAndUpdate(
            postId,
            { $push: { comments: comment } },
            { new: true }
        );

        res.status(200).json({ message: 'Comment added', result: updatedPost.comments });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

// add reply to a comment
const addReply = async (req, res) => {
    try {
        const { id: postId, commentId: parentCommentId } = req.params;
        const { userId, username, text } = req.body;

        if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(parentCommentId)) {
            return res.status(422).json({ message: "Post Id or Comment Id not valid" });
        }

        const postExist = await PostModel.exists({ _id: postId, "comments._id": parentCommentId });
        if (!postExist) {
            return res.status(404).json({ message: "Post or Comment not found" });

        }
        console.log("Yes")
        const reply = {
            userId: userId,
            username,
            text,
        };
        const parentCommentObjectId = new mongoose.Types.ObjectId(parentCommentId);

        console.log({ result: reply })
        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: postId, "comments._id": new mongoose.Types.ObjectId(parentCommentObjectId) },
            { $push: { "comments.$.replies": new mongoose.Types.ObjectId(reply._id) } },
            { new: true }
        );
       
        console.log({ result: updatedPost })

        res.status(200).json({ message: 'Reply added', result: updatedPost });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}




module.exports = {
    getAllPosts, getPostById, addPost, editPost, getUserPosts, deletePost, addReply, likePost, addComment, unlikePost
};
