import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}
        await Promise.all([conversation.save(), newMessage.save()]);
        return res.status(200).json({
            message: 'Message sent successfully',
            newMessage
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
// 663f52026da3aa36fc0c42c1
//663f5849937900f03692241f
export const getMessages = async (req, res) => {
    try {
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [recieverId, senderId] }
        }).populate('messages');

        if (!conversation) {
            return res.status(200).json({ messages: [] });
        }

        return res.status(200).json({ messages: conversation.messages });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};