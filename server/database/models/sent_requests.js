const { ObjectId } = require("mongodb");

const SentRequestSchema = {
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