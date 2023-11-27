const { ObjectId } = require("mongodb");

const UserPartnerRelSchema = {
    user: {
        type: ObjectId,
        required: true
    },
    partner: [{
        type: ObjectId
    }]
}