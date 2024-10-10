import { CartItem } from "@prisma/client";
export type CartWithoutDates = Omit<CartItem, "id, createdAt | updatedAt">;
