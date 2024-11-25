const User = require('../models/user.model')

const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).json({message: "you are successfully signed up!!", newUser});

    } catch(error){
        res.status(400).json({message: error.message})

    }

}




const loginUser = async (req, res) => {

}



module.exports = {createUser, loginUser}