const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a room type name"],
            unique: true,
        },
    },
    {
        timestamps: true, 
    }
);

const RoomType = mongoose.model("RoomType", roomTypeSchema);
module.exports = RoomType;