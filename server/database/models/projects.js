const { ObjectId } = require("mongodb");

const ProjectSchema = {
    name: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        required: true
    }
}