const { ObjectId } = require("mongodb");

const ProgressNoteSchema = {
    content: {
        type: html,
        required: true
    },
    user: {
        type: ObjectId,
        required: true
    },
    actionId: {
        type: ObjectId,
        required: true
    },
    updatedOn: {
        type: Date,
        required: true
    },
    createdOn: {
        type: Date,
        required: true
    }
}