const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

// create jwt token
const createToken = (payload, secret, expiry) => {
    return jwt.sign({ payload }, secret, { expiresIn: `${expiry}` });
}

// POST 
const registerUser = async (req, res) => {
    try {
        const { username, name, email, password, occupation, phone, gender, birthdate } = req.body;
        const image = req.file ? req.file.buffer : null;
        if (!username || !name || !email || !password || !occupation || !phone) {
            return res.status(422).json({ message: "Fill all details" });
        }
        const user = await UserModel.register({
            username,
            name,
            email,
            password,
            occupation,
            phone,
            gender,
            birthdate,
            image,
        });

        if (!user) throw Error("Registration failed");
        const token = createToken(user._id, process.env.JWT_SECRET, "2D");
        if (!token) throw Error("Token creation failed");
        res.status(200).json({message:"Registration successful",user:{
            _id:user._id,
            completedDetails:user.completedDetails,
            username:user.username,
            name:user.name,
            email:user.email
        },token});   

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

// POST
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        if (!email || !password) {
            return res.status(422).json({ message: "Fill the details correctly" });
        }
        const user = await UserModel.login(email, password);
        const token = createToken(user._id, process.env.JWT_SECRET, "2D");
        if (!user) {
            throw new Error("Login failed");
        }
        if (!token) {
            throw new Error("Token creation failed");
        }
        //success
        res.status(200).json({
            message: "Login successful", user: {
                _id: user._id,
                username: user.username,
                name: user.name,
                email: user.email
            }, token
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

//POST
const googleLogin = async(req,res)=>{
    const {email, verified} = await  req.body;
    console.log(email,verified);
    if(!verified){
        console.log('check')
        return res.status(400).json({message : "Email is not verified."});
    }
    const user = await UserModel.findOne({email : email})
    if(user){
        return res.status(200).json({message: "Login successful.",user});
    }
    else {
        console.log('check 2')
        return res.status(400).json({message : "Signup required for new account."});
    }


}

// get all users
const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}, { username: 1, name: 1, email: 1, totalPostCount: 1, createdAt: 1, createdPosts: 1 });
        if (!users) {
            return res.status(404).json({ message: "Could not fetch users", result: null });
        }
        res.status(200).json({ message: "Fetched users", result: users });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

// get user by id
const getUserById = async (req, res) => {
    try {
        const { userId } = await req.body;
        const { id: _id } = await req.params;
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(422).json({ message: "Id is invalid" });
        }        const userExist = await UserModel.exists({ _id });
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = await UserModel.findById(_id, { username: 1, name: 1, email: 1, totalPostCount: 1, createdAt: 1, createdPosts: 1 });
        if (!user) throw new Error("Failed to fetch user");
        // success
        res.status(200).json({ message: "Fetched user", result: user });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

// edit user profile
const updateUser = async (req, res) => {
    try {
        const { id: _id } = await req.params;
        const userExist = await UserModel.exists({ _id });
        if (!userExist) {
            return res.status(404).json({ message: "User doesn't exist" });
        }
        const updatedUser = await UserModel.findByIdAndUpdate(_id, { ...req.body, completedDetails: true }, { new: true }, { username: 1, name: 1, email: 1, totalPostCount: 1, createdAt: 1, createdPosts: 1 });
        if (!updatedUser) {
            throw new Error("Could not update user");
        }
        res.status(200).json({ message: "Updated successfully", result: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

// delete user
const deleteUser = async (req, res) => {
    try {
        const { id: _id } = await req.body;
        const userExist = await UserModel.exists({ _id: _id });
        if (!userExist) {
            return res.status(404).json({ message: "User doesn't exist" });
        }
        await UserModel.findByIdAndDelete(_id);
        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

module.exports = { registerUser, loginUser, getUsers, googleLogin, getUserById, updateUser, deleteUser };