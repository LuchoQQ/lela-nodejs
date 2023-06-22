const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const UserSchema = new Schema(
    {
        phone_number: {
            type: String,
            required: true,
            trim: true,
        },
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);
