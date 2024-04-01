const { model, Schema} = require('mongoose')

const treatmentSchema = new Schema (
    {
        image: {
            type: String,
            required: true
        },
        title: String,
        description: String,
        table: String,
        treatment: [{type: Schema.Types.ObjectId, ref:'Treatment'}],
        owner: {type: Schema.Types.ObjectId, ref: 'User'}
    },
    {
        timestamps: true,
    }
);

module.exports = model("Treatment", treatmentSchema);