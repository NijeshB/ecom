//https://github.com/NaimishVerma17/prisma-resources/blob/main/src/error-handler.ts
import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { User, PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import { SignUpSchema } from "./schema/users";

// declare module "express-serve-static-core" {
//   export interface Request {
//     user: User;
//   }
// }

const app: Express = express();
app.use(express.json());
app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
}).$extends({
  result: {
    address: {
      formattedAddress: {
        needs: {
          lineOne: true,
          lineTwo: true,
          city: true,
          country: true,
          pincode: true,
        },
        compute: (addr) => {
          return `${addr.lineOne}, ${addr.lineTwo},
          ${addr.city}, ${addr.country}, ${addr.pincode}`;
        },
      },
    },
  },
});

app.use(errorMiddleware);
app.listen(PORT, () => console.log(`Server is running in Port:${PORT}`));
