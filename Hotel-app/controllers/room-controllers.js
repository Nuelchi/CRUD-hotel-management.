const Room = require('../models/Room-model')

const getRooms = async (req, res) => {
    try {
        const { search, type, minPrice = 0, maxPrice } = req.query;
        const query = {};

        // Filter conditions
        if (search) {
            query.name = new RegExp(search, "i");
        }
        if (type) {
            query.roomType = type;
        }
        if (minPrice || maxPrice) {
            query.price = {
                $gte: Number(minPrice),
                $lte: Number(maxPrice || Infinity)
            };
        }

        // Fetch search result from database collection using Mongoose model
        // Fetch rooms with populated room type
        const rooms = await Room.find(query).populate('RoomType', 'name');
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




const getRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({ message: 'Room with ID not found' });
        }
        res.status(200).json(room)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




const createRoom =  async (req, res) => {
    try {
        const newRoom = await Room.create(req.body);
        res.status(200).json(newRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



const updateRoom = async (req, res) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!updateRoom) {
            return res.status(404).json({ message: 'Course with the specified ID not found!' });
        }

        // Return the updated course
        res.status(200).json(updateRoom);
    } catch (error) {
        // Handle any errors, such as invalid _id format or validation errors
        res.status(400).json({ message: error.message });
    }
};



const deleteRoom =  async (req, res) => {
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);

        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room with the specified ID not found!' });
        }

        res.status(200).json({ message: 'Room deleted successfully!', room: deletedRoom });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



module.exports = {getRooms, getRoom, createRoom, updateRoom, deleteRoom}