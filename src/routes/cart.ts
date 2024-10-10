import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import {
  additemToCart,
  changeQuantity,
  deleteItemFromcart,
  getCart,
} from "../controllers/cart";

const cartRoutes: Router = Router();

cartRoutes.post(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(additemToCart)
);

cartRoutes.get("/", [authMiddleware, adminMiddleware], errorHandler(getCart));

cartRoutes.put(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(changeQuantity)
);

cartRoutes.delete(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(deleteItemFromcart)
);

export default cartRoutes;
