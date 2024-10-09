import { NextFunction, Request, Response } from "express";
import { AddressSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "..";
import { User } from "@prisma/client";

export const addAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  AddressSchema.parse(req.body);
  const address = await prismaClient.address.create({
    data: {
      ...req.body,
      userId: req.user.id,
    },
  });

  res.json(address);
};

export const deleteAddress = async (req: Request, res: Response) => {};

export const listAddress = async (req: Request, res: Response) => {};
