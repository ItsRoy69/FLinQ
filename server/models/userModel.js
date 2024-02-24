const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
	{
		username: {
		type: String,
		trim: true,
		unique: [true, "Username must be unique"],
		required: [true, "Username is required"],
		},
		name: {
		type: String,
		trim: true,
		required: [true, "Name is required"],
		},
		email: {
		type: String,
		trim: true,
		unique: [true, "Email must be unique"],
		required: [true, "Email is required"],
		validate: {
			validator: validator.isEmail,
			message: "Email not valid",
		},
		},
		password: {
		type: String,
		trim: true,
		required: [true, "Password is required"],
		},
		occupation: {
		type: String,
		trim: true,
		required: [true, "Occupation is required"],
		},
		phone: {
		type: String,
		trim: true,
		unique: [true, "Phone number must be unique"],
		required: [true, "Phone number is required"],
		},
		gender: {
		type: String,
		trim: true,
		},
		birthdate: {
		type: Date,
		},
		image: {
		type: Buffer,
		},
		savedJobs: [
			{
				type: mongoose.SchemaTypes.ObjectId
			}
		]
	},
	{ timestamps: true }
);

// user registration
userSchema.statics.register = async function ({
		username,
		name,
		email,
		password,
		occupation,
		phone,
		gender,
		birthdate,
		image,
	}) {
	const emailExists = await this.findOne({ email });
	const usernameExists = await this.findOne({ username });

	if (emailExists) {
		throw new Error("Email already exists");
	}
	if (usernameExists) {
		throw new Error("Username already exists");
	}

	if (!validator.isEmail(email)) {
		throw new Error("Email not valid");
	}
	if (!validator.isStrongPassword(password)) {
		throw new Error("Password not strong enough");
	}

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const user = await this.create({
		username,
		name,
		email,
		password: hash,
		occupation,
		phone,
	});

	if (!user) {
		throw new Error("User registration failed");
	}

	return user;
	};

	// user login
	userSchema.statics.login = async function (email, password) {
	// Check if the email is registered
	const savedUser = await this.findOne({ email }).exec();
	if (!savedUser) {
		throw new Error("Email is not registered");
	}

	// Verify the password
	const match = await bcrypt.compare(password, savedUser.password);
	if (!match) {
		throw new Error("Password is not correct");
	}

	return savedUser;
};

module.exports = mongoose.model("UserModel", userSchema);
