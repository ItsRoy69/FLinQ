const express = require('express');
const router = express.Router();
const controllers = require('../controllers/postController');

// get all posts
router.get('/', controllers.getAllPosts);

// get posts by userId
router.get('/userPosts/:id', controllers.getUserPosts);

// create post 
router.post('/', controllers.addPost);

// edit post
router.put('/:id', controllers.editPost);

// get post by id
router.get('/:id', controllers.getPostById);

// delete post
router.delete('/:id', controllers.deletePost);

// like a post
router.post('/:id/like', controllers.likePost);

// unlike a post
router.post('/:id/unlike', controllers.unlikePost);

// add comment to a post
router.post('/:id/comment', controllers.addComment);

// add reply to a comment
router.post('/:id/comment/:commentId/reply', controllers.addReply);

module.exports = router;
