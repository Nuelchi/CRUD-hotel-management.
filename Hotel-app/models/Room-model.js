const mongoose = require('mongoose');



const roomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a room name"],
        },

        RoomType: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'RoomType', 
            required: true,
        },

        price: {
            type: Number,
            required: [true, 'Please enter a price'],
            min: 0,
            default: 0,
        },
    },
    {
        timestamps: true, 
    }
);


const Room = mongoose.model("Room", roomSchema);
module.exports = Room; 


//export default mongoose.model('Room', roomSchema);