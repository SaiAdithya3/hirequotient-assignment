import User from "../models/User.js";
import Conversation from "../models/Conversation.js";

export const getUsers = async (req, res) => {
	try {
		const { userId } = req.body; 

		const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsers: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};


export const getConversations = async (req, res) => {
    try {
        const { userId } = req.body;

        const conversations = await Conversation.find({
            participants: userId
        }).populate('participants', 'username profilePic');

        res.status(200).json(conversations);
    } catch (error) {
        console.error("Error in getConversations: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const changeUserStatus = async (req, res) => {
    try {
        const { userId } = req.body;
        const { status } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate the status value
        if (status !== 'available' && status !== 'busy') {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        user.status = status;
        await user.save();

        return res.status(200).json({ message: 'User status updated successfully' });
    } catch (error) {
        console.error('Error in changing user status:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
