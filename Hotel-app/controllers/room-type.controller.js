const RoomType = require('../models/Room-Type-model');


const getRoomsTypes = async (req, res) => {
    try {
        const roomType = await RoomType.find({});
        res.status(200).json(roomType)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRoomsType = async (req, res) => {
    try {
        const room = await RoomType.findById(req.params.id);

        if (!room) {
            return res.status(404).json({ message: 'RoomType with ID not found' });
        }
        res.status(200).json(room)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createRoomType = async (req, res) => {
    try {
        const roomType = await RoomType.create(req.body);
        res.status(200).json(roomType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




module.exports = {getRoomsType, createRoomType, getRoomsTypes};