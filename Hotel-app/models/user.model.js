const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please enter your name"]
        },
        email: {
            type: String,
            unique: true,
            required: [true, "please enter a valid email"],
            lowercase: true,
            validate: [validator.isEmail, "please enter a valid email"]
        },
        password: {
            type: String,
            required: [true, "please enter a password"],
            minlength: 8,
            select: false
        },
        confirmPassword: {
            type: String,
            required: [true, "please enter a password"],
            minlength: 8,
            validate: {
                validator: function (pass) {
                    return pass === this.password;
                },
                message: "password and confirmpassword do not match"
            },
            // role: {
            //     default: user,
            // },
        }
    }
)

userSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 11);
    this.confirmPassword = undefined;
});

const user = mongoose.model("user", userSchema);
module.exports = user;