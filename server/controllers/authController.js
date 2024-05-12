import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signupUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword, gender } = req.body;

        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match!" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists!" });
        }
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const maleProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femailProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? maleProfile : femailProfile,
        });
        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                message: "User registered successfully!",
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user data!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};



export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const editProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const { username, email } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();
        return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.log("Error in edit profile controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { userId } = req.body;
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await User.findById(userId);
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid old password" });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.log("Error in change password controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
