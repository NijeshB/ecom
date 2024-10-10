import { User } from "@prisma/client";
export type UserWithoutPasswordDates = Omit<
  User,
  "password | createdAt | updatedAt"
>;
