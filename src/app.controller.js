import { authRouter } from "./modules/auth/auth.controller.js";
import { connectionDB } from "./DB/connection.js";
import { productRouter } from "./modules/products/product.controller.js";
import { orderRouter } from "./modules/orders/order.controller.js";
import { reportRouter } from "./modules/report aggregation/aggregate.controller.js";

export const bootstrap = async (app, express) => {

    app.use(express.json());

    connectionDB()// connection to db

    app.use(authRouter); // auth routes
    app.use(productRouter); // product routes
    app.use(orderRouter); // order routes
    app.use(reportRouter); // report 
    // default path return 
    app.use((req, res) => {
        return res.status(404).json({ message: 'this path not found' })
    })

    // global error handling
    app.use((err, req, res, next) => {
        const status = err.cause || 500;
        console.log(err)
        return res.status(status).json({ error: err.message, stack: err.stack })
    })
}