import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

import {
  cancelOrder,
  createOrder,
  getorderById,
  listOrders,
} from "../controllers/orders";
const orderRoutes: Router = Router();

orderRoutes.post("/", [authMiddleware], errorHandler(createOrder));

orderRoutes.get("/", [authMiddleware], errorHandler(listOrders));

orderRoutes.put("/:id", [authMiddleware], errorHandler(cancelOrder));

orderRoutes.get("/:id", [authMiddleware], errorHandler(getorderById));

export default orderRoutes;
