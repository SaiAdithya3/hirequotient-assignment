import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [recieverId, senderId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [recieverId, senderId]
            });
        }

        const newMessage = new Message({
            sender: senderId,
            reciever: recieverId,
            message
        });

        if (newMessage) {
            // await newMessage.save();
            conversation.messages.push(newMessage._id);
            // await conversation.save();
        }
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