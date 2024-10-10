import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

import {
  cancelOrder,
  changeStatus,
  createOrder,
  getorderById,
  listAllOrders,
  listOrders,
  listUserOrders,
} from "../controllers/orders";
const orderRoutes: Router = Router();

orderRoutes.post("/", [authMiddleware], errorHandler(createOrder));

orderRoutes.get("/", [authMiddleware], errorHandler(listOrders));

orderRoutes.put("/:id", [authMiddleware], errorHandler(cancelOrder));

orderRoutes.get("/index", [authMiddleware], errorHandler(listAllOrders));
orderRoutes.get("/users/:id", [authMiddleware], errorHandler(listUserOrders));
orderRoutes.put("/:id/status", [authMiddleware], errorHandler(changeStatus));
orderRoutes.get("/:id", [authMiddleware], errorHandler(getorderById));
export default orderRoutes;
