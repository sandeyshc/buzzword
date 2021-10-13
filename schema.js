const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Orders = new Schema({
    order_id: { type: Number, required: true },
    item_name: { type: String, required: true },
    cost: { type: Number, required: true },
    order_date :{ type: String, required: true },
    delivery_date: { type: String, required: true }
}, { timestamps: true }, )

module.exports = mongoose.model('orders', Orders)


// "order_id": "123",
// "item_name":"Samsung Mobile",
// "cost":"400",
// "order_date":"2020/12/01",
// "delivery_date":"2020/12/11"