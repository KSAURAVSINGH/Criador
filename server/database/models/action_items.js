const { ObjectId } = require("mongodb")

const ActionItemSchema = {
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    progressNote: [{
        type: ObjectId
    }],
    user: {
        type: ObjectId,
        required: true
    },
    partner: [{
        type: ObjectId  // Currently storing email ids
    }],
    project: {
        type: ObjectId,
        required: true
    },
    hitCount: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true
    },
    updatedOn: {
        type: Date,
        required: true
    }
}
 