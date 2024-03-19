const mongoose = require('mongoose')
const moment = require('moment')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, required: true, unique: true
    },
    lastName: {
        type: String, required: true, unique: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    semester: {
        type: String, enum: ['S1', 'S2', "S3", 'S4', 'S5', 'S6', 'S7', 'S8', null], default: null,
    },
    college: {
        type: String, default: null,
    },
    department: {
        type: String, default: null,
    },
    loginAttempts: {
        type: Number, default: 0
    },
    lockUntil: {
        type: Date, default: new Date(0)
    },
    lastUpdatedBy: { type: mongoose.Types.ObjectId, ref: 'User', default: null },
    resetTokenUsed: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });

userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        const createdAt = moment(ret.createdAt);
        const updatedAt = moment(ret.updatedAt);

        const now = moment();
        const createdAgo = createdAt.from(now);
        const updatedAgo = updatedAt.from(now);

        ret.createdAt = {
            date: createdAt.format('DD/MM/YYYY , HH:mm'),
            ago: createdAgo
        };

        ret.updatedAt = {
            date: updatedAt.format('DD/MM/YYYY , HH:mm'),
            ago: updatedAgo
        };

        return ret;
    }
});

userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;