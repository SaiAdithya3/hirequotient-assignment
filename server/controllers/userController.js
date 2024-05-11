import User from "../models/User.js";

export const getUsers = async (req, res) => {
	try {
		
		const loggedInUserId = req.user_id;
		// console.log(loggedInUserId);
		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
		// const filteredUsers = await User.find().select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getusers: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};