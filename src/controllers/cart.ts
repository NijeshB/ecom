import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { CreateCartSchema, ChangeQuanitySchema } from "../schema/cart";
import { CartItem, Product } from "@prisma/client";
import { CartWithoutDates } from "./../types/cart";
import { BadRequestsException } from "../exceptions/bad-requests";

export const additemToCart = async (req: Request, res: Response) => {
  const validatedData = CreateCartSchema.parse(req.body);
  let product: Product;
  try {
    product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: validatedData.productId,
      },
    });
  } catch (err) {
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }

  const userCart = await prismaClient.cartItem.findFirst({
    where: {
      userId: req.user.id,
      productId: validatedData.productId,
    },
  });
  let cart: CartWithoutDates;

  if (!userCart) {
    cart = await prismaClient.cartItem.create({
      data: {
        userId: req.user.id,
        productId: product.id,
        quantity: validatedData.quantity,
      },
    });
  } else {
    cart = await prismaClient.cartItem.update({
      where: {
        id: userCart.id,
      },
      data: {
        quantity: ++userCart.quantity,
      },
    });
  }
  cart = cart as CartWithoutDates;
  res.json(cart);
};

export const deleteItemFromcart = async (req: Request, res: Response) => {
  try {
    const userCart = await prismaClient.cartItem.findFirst({
      where: {
        id: +req.params.id,
      },
    });

    if (userCart && userCart.userId != +req.params.id) {
      throw new BadRequestsException(
        "Cart not belong to user",
        ErrorCode.CART_DOES_NOT_BELONG
      );
    }
    await prismaClient.cartItem.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.json({ success: true });
  } catch (err) {
    throw new NotFoundException("cart not found", ErrorCode.CART_NOT_FOUND);
  }
};

export const changeQuantity = async (req: Request, res: Response) => {
  try {
    const validatedData = ChangeQuanitySchema.parse(req.body);
    const updatedCart = await prismaClient.cartItem.update({
      where: {
        id: +req.params.id,
      },
      data: {
        quantity: validatedData.quantity,
      },
    });

    res.json(updatedCart);
  } catch (err) {}
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const cart = await prismaClient.cartItem.findMany({
      where: {
        userId: +req.user.id,
      },
      include: {
        product: true,
      },
    });
    res.send(cart);
  } catch (err) {
    throw new NotFoundException("cart is empty", ErrorCode.CART_NOT_FOUND);
  }
};
