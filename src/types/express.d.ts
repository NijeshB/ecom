// import { User } from "@prisma/client";
// import express, { Express } from "express";

// declare module "express-serve-static-core" {
//   export interface Request {
//     user: User;
//   }
// }

// declare namespace Express {
//   export interface Request {
//     user: { id: number };
//   }
// }

/*
declare global {
  namespace Express {
    export interface Request {
      users?: any;
    }
  }
}
*/

import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
