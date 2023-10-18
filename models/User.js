const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index : true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        index : true,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    place: {
        type: String,
    }
});

module.exports = mongoose.model('User', userSchema);
