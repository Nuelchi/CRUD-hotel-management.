
const User = require('../models/user.model');
jwt = require('jsonwebtoken');
bcrypt = require('bcryptjs')



const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(200).json({ message: "Account created successfully!!, you can now login to gain full access", user });


    } catch (error) {
        res.status(400).json({ message: error.message })

    }

}




const loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        // check if inputs were given
        if (!email || !password) {
            return res.status(404).json({ message: 'Password and Email required' });

        }
        // check if user exists in the data base
        newUser = await User.findOne({ email }).select('+password');
        if (!newUser) {
            res.status(404).json({ message: 'user with email does not exist,  please register first' })
        };

        if (!await bcrypt.compare(password, newUser.password)) {
            return res.status(404).json({ message: 'invalid password' })
        };

        const Token = jwt.sign({ id: newUser._id }, process.env.SECRET_STR, {
            expiresIn: process.env.LOGIN_EXPIRES
        })

        res.cookie('jwt', Token)
        return res.status(200).json({ message: 'You have Logged in Successfully!!, find your Access token in the cookie section' });
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
};




const resetPassword = async (req, res) => {
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









//MIDDLEWARES AND ROLES
//midddleware to verify all users trying to gain access to the app
const protectPath = async (req, res, next) => {

    const authorizationHeader = req.headers.authorization;
    if(!authorizationHeader){
        return res.status(401).json({message: 'please provide an Acesss token'})
    }

    if (authorizationHeader && authorizationHeader.toLowerCase().startsWith('bearer ')) {
        const token = authorizationHeader.split(' ')[1]; // Extract the token part

        // Proceed to verify the token
        try {
            const decoded = await jwt.verify(token, process.env.SECRET_STR);
            const user = User.findById(decoded.id);
        
            if(!user){
                res.status(400).json({message: 'user with Token not found in DB please sign up or login user'});
            }
            req.user = user;
        } catch (error) {
            console.error('Token verification failed:', error.message);
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    } else {
        return res.status(401).json({ message: 'Authorization header missing or invalid' });
    };
    next();
};



//middleware to restriction certain users from performing some roles
const restriction = (role) => {
    return (req, res, next) => {
        // Check if the user's role matches the required role
        if (req.user.role !== role) {
            console.log('req.user:', req.user.role);
            return res.status(403).json({ message: 'You do not have access to perform this action' });
        }
        next(); // Allow access to the next middleware or route handler
    };
};





module.exports = { createUser, loginUser, resetPassword, protectPath,restriction };