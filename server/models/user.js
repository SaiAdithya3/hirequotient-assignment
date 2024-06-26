import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
        profilePic: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            enum: ["available", "busy"],
            default: "available",
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;