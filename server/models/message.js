import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		message: {
			type: String,
		},
		attachments: [{
			type: {
				type: String,
				enum: ['image', 'video', 'file'],
				default: 'image',
			},
			url: {
				type: String,
			},
		}]
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
