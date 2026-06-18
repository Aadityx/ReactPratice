const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const router = express.Router();
const SECRET_KEY = "my_secret_key";
//New User
router.post('/register', async (req, res) => {
    const { name, email, password, userType } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json(
                {
                    status: "Duplicate",
                    message: "User already exists"
                }
            )
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(
            {
                name,
                email,
                password: hashedPassword,
                userType
            }
        )
        const user = await newUser.save();
        res.status(201).json(
            {
                Status: "Success",
                message: "User created",
                user: user
            }
        )
    }
    catch (error) {
        console.log("Error: ", error);
        return res.status(401).json(
            {
                status: "Error",
                message: "Failed to add new user"
            }
        )
    }
})

//login point
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json(
                {
                    status: "Failed",
                    message: "Invalid Email"
                }
            )
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json(
                {
                    status: "Failed",
                    message: "Invalid Password"
                }
            )
        }
        const token = jwt.sign(
            {
                userID: user._id,
                userType: user.userType,
                name: user.name,
                email: user.email
            },
            SECRET_KEY,
            { expiresIn: '1h' }
        );
        res.status(200).json(
            {
                status: "Success",
                message: "User Logged In",
                token: token
            }
        )
    }
    catch (error) {
        console.log("error :", error);

        return res.status(400).json(
            {
                status: "Failed",
                message: "Login Failed"
            }
        )
    }
})

module.exports = router