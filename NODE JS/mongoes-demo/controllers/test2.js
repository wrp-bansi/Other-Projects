const Order = require('../models/test2');


const createOrder = async (req, res) => {
    const { orderNumber, orderName, test_id } = req.body;
    try {
        const result = await Order.create({ orderNumber, orderName, test_id });
        res.status(201).json({ error: false, message: "Order created successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error", data: {} });
    }
};


const showOrder = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const pageSize = 1;
        const skip = (page - 1) * pageSize;

        const allOrders = await Order.aggregate([
            {
                $lookup: {
                    from: 'tests',
                    localField: 'test_id',
                    foreignField: '_id',
                    as: 'test_info'
                }
            },

            { $skip: skip },
            { $limit: pageSize }
        ]);

        res.status(200).json({ error: false, message: "Orders fetched successfully", data: allOrders });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error", data: {} });
    }
}
module.exports={createOrder,showOrder}
