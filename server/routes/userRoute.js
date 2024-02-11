const express = require('express');
const router = express.Router();
const controllers = require('../controllers/userController.js');

// register user
router.post('/register', controllers.registerUser);
// login user
<<<<<<< HEAD
router.post('/login',controllers.loginUser);
=======
router.post('/login', controllers.loginUser);

// get all users
router.get('/', controllers.getUsers);
// get user by id
router.post('/getuser/:id', controllers.getUserById);
// update user
router.put('/update/:id', controllers.updateUser);
// delete user
router.delete('/delete/:id', controllers.deleteUser);
>>>>>>> 88c326f2d43ad1f42d07f7d10b0b1bdb38ef8327

module.exports = router;