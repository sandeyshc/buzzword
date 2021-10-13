const Orders = require('./schema')

createOrders = (req, res) => {
    // console.log(req.body)
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a order',
        })
    }

    const ordersm = new Orders(body)
    // console.log(ordersm.order_id, "ssss")
// Orders.findOne({ order_id: ordersm.order_id }, (err, orders) =>{console.log(orders)})
    if (!ordersm) {
        return res.status(400).json({ success: false, error: err })
    }
    // else{
    Orders.findOne({ order_id: ordersm.order_id }, (err, orders) =>{
        if(orders!=null){
            return res.status(400).json({ success: false, error: 'order id already exist' })
        }
        else{
            // console.log("yes",ordersm)
            ordersm
                .save()
                .then(() => {
                    return res.status(201).json({
                        success: true,
                        id: ordersm._id,
                        message: 'Orders created!',
                    })
                })
                .catch(error => {
                    return res.status(400).json({
                        error:error,
                        message: 'Orders not created!',
                    })
                })
        }
    })


    }
// }


updateOrders = async(req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Orders.findOne({ order_id: body.order_id }, (err, orders) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Order not found!',
            })
        }
        orders.delivery_date = body.delivery_date
        orders
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: orders._id,
                    message: 'Orders updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Orders not updated!',
                })
            })
    })
}
getOrders = async(req, res) => {
    const body = req.body
    await Orders.find({delivery_date:body.delivery_date}, (err, orders) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!orders.length) {
            return res
                .status(404)
                .json({ success: false, error: `Orders not found` })
        }
        return res.status(200).json({ success: true, data: orders })
    }).clone().catch(err => console.log(err))
}
getOrderById = async(req, res) => {
    const body = req.body
    await Orders.findOne({ order_id: body.order_id }, (err, order) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!order) {
            return res
                .status(404)
                .json({ success: false, error: `Orders not found` })
        }
        return res.status(200).json({ success: true, data: order })
    }).clone().catch(err => console.log(err))
}
deleteOrder = async(req, res) => {
    const body = req.body
    await Orders.findOneAndDelete({ order_id: body.order_id }, (err, order) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        // console.log(order,"jjj")
        if (!order) {
            // console.log("no")
            return res
                .status(404)
                .json({ success: false, error: `Order not found` })
        }

        return res.status(200).json({ success: true, message: "deleted" })
    }).catch(err => console.log(err))
}

module.exports = {
    createOrders,
    updateOrders,
    getOrders,
    getOrderById,
    deleteOrder


}