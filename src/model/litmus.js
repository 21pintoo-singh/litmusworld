const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    
    fname: { type: String, required: true, trim: true },

    lname: { type: String, required: true, trim: true },

    email: { type: String, required: true, trim: true, unique: true },

    phone: { type: String, required: true, unique: true, trim: true },

    password: { type: String, required: true },
    
    createdAt: {
        type: String,
        default: new Date().toISOString(),
    }
    },
   
{versionKey:false}
);

module.exports = mongoose.model('user', userSchema)