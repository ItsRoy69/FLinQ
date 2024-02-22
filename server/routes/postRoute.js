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


module.exports = router;