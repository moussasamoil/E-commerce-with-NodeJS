import { orderModel } from "../../models/order.model.js"


export const salesSummary = async (req, res, next) => {
    let sales_summary = await orderModel.aggregate([
        {
            $match: { status: 'sold' }
        },

        {
            $facet: {
                totalRevenue: [
                    {
                        $group: {
                            _id: null,
                            total: { $sum: "$total_amount" }
                        }
                    }
                ],
                totalProducts: [
                    { $unwind: "$products" },
                    {
                        $group: {
                            _id: null,
                            total: { $sum: "$products.count" }
                        }
                    }
                ],

                totalOrders: [
                    {
                        $count: "count"
                    }
                ]

            }
        },


    ])
    const revenue = sales_summary[0]?.totalRevenue[0]?.total || 0;
    const products = sales_summary[0]?.totalProducts[0]?.total || 0;
    const orders = sales_summary[0]?.totalOrders[0]?.count || 0;
    return res.status(200).json({
        message: "sales summary ",
        totalOrders: orders,
        totalRevenue: revenue,
        averageOrderValue: orders === 0 ? 0 : revenue / orders

    })
}

export const SalesByCategory = async (req, res, next) => {
    let sales_category = await orderModel.aggregate([
        {
            $match: { status: "sold" }
        },
        { $unwind: "$products" },
        {
            $lookup: {
                from: "products",
                localField: "products.productId",
                foreignField: "_id",
                as: "productInfo"
            }
        },
        {
            $unwind: "$productInfo"
        },
        {
            $addFields: {
                itemTotal: {
                    $multiply: [
                        "$products.count",
                        "$productInfo.price"
                    ]
                }
            }
        },
        {
            $group: {
                _id: "$productInfo.category",

                totalQuantity: {
                    $sum: "$products.count"
                },

                totalSales: {
                    $sum: "$itemTotal"
                }
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                totalQuantity: 1,
                totalSales: 1
            }
        },

        {
            $sort: {
                totalSales: -1
            }
        }
    ])
    return res.status(200).json({ message: 'sales category', data: sales_category })
}

export const topSellingProducts = async (req, res, next) => {

    let result = await orderModel.aggregate([
        { $match: { status: "sold" } },
        { $unwind: "$products" },
        {
            $group: {
                _id: "$products.productId",
                totalSold: {
                    $sum: "$products.count"
                }
            }
        },

        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product"
            }
        },

        {
            $unwind: "$product"
        },

        {
            $project: {
                _id: 0,
                productTitle: "$product.title",
                totalSold: 1
            }
        },

        { $sort: { totalSold: -1 } },
        { $limit: 5 }

    ]);

    return res.status(200).json({
        message: "top selling products",
        data: result
    });
};

export const userPurchaseStats = async (req, res, next) => {

    let result = await orderModel.aggregate([
        // 1. only sold orders
        {
            $match: { status: "sold" }
        },
        // 2. group by user
        {
            $group: {
                _id: "$user_id",

                totalOrders: {
                    $sum: 1
                },

                totalSpent: {
                    $sum: "$total_amount"
                }
            }
        },
        // 3. join users table
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        // 4. shape output
        {
            $project: {
                _id: 0,
                userName: "$user.name",
                totalOrders: 1,
                totalSpent: 1
            }
        },
        // optional sorting (top users)
        {
            $sort: { totalSpent: -1 }
        }
    ]);

    return res.status(200).json({
        message: "user purchase statistics",
        data: result
    });
};