const { model, Schema } = require('mongoose')

const promoSchema = new Schema (
    {
        image: {
            type: String,
            required: true
        },
        owner: {type: Schema.Types.ObjectId, ref: 'User'}
    },
    {
        timestamps: true
    }
);

module.exports = model('Promo', promoSchema);