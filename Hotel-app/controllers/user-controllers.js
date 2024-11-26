const { sign } = require('jsonwebtoken');
const User = require('../models/user.model');
const user = require('../models/user.model');
jwt = require('jsonwebtoken');
bcrypt = require('bcryptjs')

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(200).json({message: "Account created successfully!!, you can now login to gain full access",user,});
        

    } catch(error){
        res.status(400).json({message: error.message})

    }

}




const loginUser = async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        // check if inputs were given
        if(!email || !password){
            return res.status(404).json({ message: 'Password and Email required'});

        }
        // check if user exists in the data base
        newUser = await User.findOne({email}).select('+password');
        if(!newUser){
            res.status(404).json({message: 'user with email does not exist,  please register first'})
        };

        if(!await bcrypt.compare(password, newUser.password)){
            return res.status(404).json({message: 'invalid password'})
        };

        const Token = jwt.sign({id: newUser._id}, process.env.SECRET_STR, {
            expiresIn: process.env.LOGIN_EXPIRES
        })

        res.cookie('jwt', Token)
        return res.status(200).json({ message: 'You have Logged in Successfully!!, find your Access token in the cookie section'});
    } catch(error){
        res.status(404).json({message: error.message});

    }
};




const resetPassword = async (req, res) =>{
    try {
        const updatePassword = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!updatePassword) {
            return res.status(404).json({ message: 'User with the specified ID not found!' });
        }

        // Return the updated User
        res.status(200).json(updatePassword);
    } catch (error) {
        // Handle any errors, such as invalid _id format or validation errors
        res.status(400).json({ message: error.message });
    }
};

const protectPath = async(req, res, next) =>{
    //read the token and check if it exists
    testToken = req.headers.authorization;
    
    let Token;
    if(testToken && testToken.toLowerCase().startsWith('bearer ')){
        Token = testToken.split(' ')[1];
    }
    if(!Token){
        res.status(401).json({ message: 'please provide the Access token issued to you at login'});
    }
   

    //Validate token
    // const decoded = await jwt.verify(Token, process.env.SECRET_STR);
    // console.log('Decoded Payload:', decoded);

    // if(!decoded){
    //     res.status(404).json({message: 'Token has expired, please login again'})
    // }

    // //verify if the user exists
    // user = User.findOne(user._id)
    next()
}



module.exports = {createUser, loginUser, resetPassword, protectPath}