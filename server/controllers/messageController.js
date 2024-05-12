import Conversation from '../models/Conversation.js';
import Message from '../models/message.js';
import User from '../models/User.js';
import io from '../socket/socket.js';
import { getGeminiResponse } from '../controllers/geminiResponse.js';

export const sendMessage = async (req, res) => {
    try {
        const { message, attachments, senderId } = req.body;
        const { id: receiverId } = req.params;

        // Fetch receiving user's status
        const receiverUser = await User.findById(receiverId);
        if (!receiverUser) {
            return res.status(404).json({ message: 'Receiver user not found' });
        }

        // Determine the receiver's status (assuming status is a property of the User model)
        const status = receiverUser.status;

        // Find or create the conversation between sender and receiver
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [] // Initialize messages array
            });
        }

        // Create a new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            attachments: attachments ? attachments : []
        });

        // Save the user's message
        await newMessage.save();

        // Push the user's message to the conversation
        conversation.messages.push(newMessage);

        if (status === 'busy') {
            // If receiver is busy, generate a response using Gemini
            const response = await getGeminiResponse(message, receiverUser.username);
            const geminiMessage = new Message({
                senderId: receiverId,
                receiverId: senderId,
                message: response,
                createdAt: new Date(),
                attachments: attachments ? attachments : []
            });
            
            // Save the Gemini response
            await geminiMessage.save();

            // Push the Gemini response to the conversation
            conversation.messages.push(geminiMessage);
        }

        // Save the conversation with the updated messages array
        await conversation.save();

        // Emit the new message to the socket
        io.emit('new-message', newMessage);

        return res.status(200).json({
            message: 'Message sent successfully',
            newMessage
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { senderId, recieverId } = req.params;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
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

// 663f52026da3aa36fc0c42c1
//663f5849937900f03692241f
// export const getMessages = async (req, res) => {
//     try {
//         const { id: recieverId } = req.params;
//         // const senderId = req.user._id;
//         const senderId = req.body._id;

//         const conversation = await Conversation.findOne({
//             participants: { $all: [recieverId, senderId] }
//         }).populate('messages');

//         if (!conversation) {
//             return res.status(200).json({ messages: [] });
//         }

//         return res.status(200).json({ messages: conversation.messages });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: error.message });
//     }
// };

