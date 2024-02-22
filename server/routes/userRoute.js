const express = require('express');
const router = express.Router();
const controllers = require('../controllers/userController.js');

// register user
router.post('/register', controllers.registerUser);
// login user
router.post('/login', controllers.loginUser);

// get all users
router.get('/', controllers.getUsers);
// get user by id
router.post('/getuser', controllers.getUserById);
//google login
router.post('/googleLogin',controllers.googleLogin)
// update user
router.put('/update/:id', controllers.updateUser);
// delete user
router.delete('/delete/:id', controllers.deleteUser);

module.exports = router;