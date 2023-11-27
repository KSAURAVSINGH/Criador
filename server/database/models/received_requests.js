const { ObjectId } = require("mongodb");

const ReceivedRequestSchema = {
    user: {
        type: ObjectId,
        required: true
    },
    partner: {
        type: ObjectId,
        required: true
    },
    status: {
        type: String // pending, accepted, cancelled
    }
}