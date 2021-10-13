const express = require('express')
const OrdersCtrl = require('./order-ctrl')

const router = express.Router()

router.post('/create', OrdersCtrl.createOrders)
router.put('/update', OrdersCtrl.updateOrders)
router.get('/list', OrdersCtrl.getOrders)
router.get('/search', OrdersCtrl.getOrderById)
router.delete('/delete', OrdersCtrl.deleteOrder)
module.exports = router
