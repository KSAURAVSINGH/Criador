const { ObjectId } = require("mongodb");

const TokenSchema = {
    userId: {
        type: ObjectId,
        required: true
    },
    toke: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
}