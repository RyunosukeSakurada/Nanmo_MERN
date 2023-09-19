import mongoose from "mongoose";
const {Schema,model} = mongoose;

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
        }
    }], 
    status: {
        type: String,
        enum: ['pending', 'done'], 
        required: true,
        default: 'pending'   
    },
},
{timestamps: true}
);

module.exports = model('Order', OrderSchema);
