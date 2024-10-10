import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import {
  additemToCart,
  changeQuantity,
  deleteItemFromcart,
  getCart,
} from "../controllers/cart";

const cartRoutes: Router = Router();

cartRoutes.post("/", [authMiddleware], errorHandler(additemToCart));

cartRoutes.get("/", [authMiddleware], errorHandler(getCart));

cartRoutes.put("/:id", [authMiddleware], errorHandler(changeQuantity));

cartRoutes.delete("/:id", [authMiddleware], errorHandler(deleteItemFromcart));

export default cartRoutes;
