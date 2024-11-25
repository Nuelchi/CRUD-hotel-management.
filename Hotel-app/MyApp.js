require('dotenv').config();

const mongoose = require('mongoose');
const Room = require('./models/Room-model.js');
const RoomType = require('./models/Room-Type-model.js');
const userRoute = require('./Routes/user-routes.js')

const express = require('express');
const { Db } = require('mongodb');
const app = express();

const roomRoute = require('./Routes/room.routes.js')
const roomTypeRoute = require('./Routes/roomType.route.js')



const PORT = process.env.PORT || 4000;




//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




//ROUTES
app.use('/api/rooms', roomRoute)
app.use('/api/rooms-types', roomTypeRoute)
app.use('/api/user', userRoute)




//Connecting to Mongo Database

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to the Database!'))
    .catch((error) => console.log('Connection failed', error));

//   console.log('MONGO_URI:', process.env.MONGO_URI);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));